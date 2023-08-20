#  NOTE: This project is no longer maintained

## squad2xws

Useful REST endpoints related to [X-Wing: The Miniatures Game (Second Edition)](https://www.atomicmassgames.com/xwing-documents) by [Atomic Mass Gaming](https://www.atomicmassgames.com).

## Related projects and web pages

XWS is the X-wing Specification: https://github.com/elistevens/xws-spec

YASB is Yet Another Squad Builder: https://yasb.app

X-Wing Data 2 holds useful information about x-wing pilots, upgrade cards, etc: https://github.com/guidokessels/xwing-data2

## YASB URL to XWS

GET endpoint for XWS data.  Copy a usual YASB url, changing the host and path from `raithos.github.io` to `{somehost}/yasb/xws`
Example: `https://yasb.app/?f=Rebel%20Alliance&d=v9ZsZ20Z393X417W99W368W453WW236W108W154Y52X119W331W371Y74X130W114W13W12WW68W247W313Y49X355W106&sn=Random%20Squad&obs=`
becomes `https://{somehost}/yasb/xws??f=Rebel%20Alliance&d=v9ZsZ20Z393X417W99W368W453WW236W108W154Y52X119W331W371Y74X130W114W13W12WW68W247W313Y49X355W106&sn=Random%20Squad&obs=`

## Reverse YASB

Post endpoint for XWS data.  Returns a valid YASB 2.5 url.

### Getting started
1. ```npm install```
2. ```npm run dev``` or ```npm run start```
3. install grunt-cli.  OSX `brew install grunt-cli` or linux: `sudo apt-get install grunt`
4. linux:
```
sudo apt-get install gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

### submodule (xwing-data2 and xwing, aka YASB)
```
git submodule init
git submodule update
git submodule foreach git pull origin master
````

### Make an update
```
./yasb-reimport.sh
git add .
git commit -m 'more updates'
git push origin master
git push heroku master
```

### Troubleshooting
If you get weird "extra argument" npm errors, try updating to the latest npm:
```
sudo npm install -g n
sudo n latest
sudo npm install -g npm
```
Source: https://github.com/npm/cli/issues/681#issuecomment-640470740

