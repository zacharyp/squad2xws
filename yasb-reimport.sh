#!/bin/bash

# reimports the YASB file cards-common.coffee for any updates upstream, and re-converts it to javascript for use by typescript code

git submodule foreach git pull origin master

npm install -g decaffeinate

decaffeinate --use-cs2 xwing/coffeescripts/content/cards-common.coffee

mv xwing/coffeescripts/content/cards-common.js js-holding/cards-common.js

rm src/services/yasb/lib/cards-common.js

cat js-holding/cards-common.header js-holding/cards-common.js >> src/services/yasb/lib/cards-common.js

rm js-holding/cards-common.js
