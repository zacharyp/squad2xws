## squad2xws

FFG x-wing squads to XWS.  Also YASB urls to XWS, or XWS to YASB urls.

## Usage

Take the UUID (unique identifier) of your squadbuilder squad, i.e the `8d86dd8d-1ff8-4e07-a9cb-37582fe0655f` out of the URL `https://squadbuilder.fantasyflightgames.com/squad-preview/8d86dd8d-1ff8-4e07-a9cb-37582fe0655f`

Then go to http://squad2xws.herokuapp.com/translate/8d86dd8d-1ff8-4e07-a9cb-37582fe0655f
 (editing for your squd's UUID), and you will be presented with [XWS](https://github.com/elistevens/xws-spec) JSON, for example:
 
```
{"faction":"scumandvillainy","pilots":[{"id":"l337-escapecraft","ship":"escapecraft","upgrades":{"crew":["tacticalofficer"]},"points":24},{"id":"bobafett","ship":"firesprayclasspatrolcraft","upgrades":{"crew":["perceptivecopilot"],"gunner":["hansolo-gunner"],"title":["marauder"],"ept":["debrisgambit"]},"points":99},{"id":"fennrau","ship":"fangfighter","upgrades":{"ept":["fearless"]},"points":71}],"name":"Boba Fenn L3-37","description":"","points":194}
```

This JSON can be imported into either [YASB](https://raithos.github.io) or [Vassal X-wing module](http://www.vassalengine.org/wiki/Module:Star_Wars:_X-Wing_Miniatures_Game).

## Reverse YASB

Post endpoint for XWS data.  Returns a valid YASB2 url.

POST JSON xws to `http://squad2xws.herokuapp.com/yasb/reverse`

## API Documentation

Located here: http://squad2xws.herokuapp.com/api-docs/#/

### Getting started
1. ```npm install```
2. ```npm run dev``` or ```npm run start```
3. install grunt-cli.  OSX `brew install grunt-cli` or linux: `sudo apt-get install grunt-cli`
4. linux:
```
sudo apt-get install gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

### xwing-data2 submodule
`git submodule foreach git pull origin master`


### Heroku
Needs the puppeteer buildpack installed:

`heroku buildpacks:add jontewks/puppeteer`
