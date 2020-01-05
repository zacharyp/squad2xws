#!/bin/bash

# git submodule foreach git pull origin master

# npm install -g decaffeinate

decaffeinate --use-cs2 xwing/coffeescripts/cards-common.coffee

mv xwing/coffeescripts/cards-common.js js-holding/cards-common.js

cat js-holding/cards-common.header js-holding/cards-common.js >> src/services/yasb/lib/cards-common.js

rm js-holding/cards-common.js
