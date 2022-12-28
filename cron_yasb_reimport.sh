#!/bin/bash

cd /var/www/squad2xws

git submodule foreach git pull origin master

rm src/services/yasb/lib/cards-common.js

curl --fail https://yasb.app/javascripts/xwingcontent.min.js > js-holding/cards-common.js

if [ -s /var/www/squad2xws/js-holding/cards-common.js ]
then
    echo "File not empty"
    cat js-holding/cards-common.header js-holding/cards-common.js >> src/services/yasb/lib/cards-common.js

    rm js-holding/cards-common.js

    npx tsc

    pm2 restart squad2xws
else
     echo "File empty"
fi
