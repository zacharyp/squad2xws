import puppeteer from 'puppeteer';

export async function covert_xws(xwsString: string): Promise<string> {
    var browser = await puppeteer.launch(
        {
            headless: true,
            defaultViewport: {
                width: 1100,
                height: 800
            },
            args: ['--no-sandbox']
        }
    )
    var page = await browser.newPage()

    await page.goto("file://" + __dirname + "/../../../yasb-app/index.html")
//    await page.goto("https://raithos.github.io/")
    await page.waitForSelector(".from-xws")

    page.click('.from-xws')

    await page.evaluate(function clean(xwsString: string) {
      const textArea = $('.xws-content');
      textArea.val(xwsString);
    }, xwsString);

    // Need to manually wait for xws to load into textarea?
    // Nothing is becoming visible to indicate the xws JSON is ready to process
    await page.waitFor(1000);

//    await page.waitForSelector('.import-xws')

    await Promise.all([
        page.click('.import-xws'),
        page.waitForNavigation()
    ])
    var pageURL = page.url();
    var spl = pageURL.split("?")
    var result = "https://raithos.github.io/?" + spl[1];

    browser.close()
    return result;
}
