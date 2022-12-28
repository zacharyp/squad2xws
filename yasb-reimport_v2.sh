#!/bin/bash

# reimports the YASB file xwingcontent.min.js for any updates upstream, and

git submodule foreach git pull origin master

rm src/services/yasb/lib/cards-common.js

curl https://yasb.app/javascripts/xwingcontent.min.js > js-holding/cards-common.js

cat js-holding/cards-common.header js-holding/cards-common.js >> src/services/yasb/lib/cards-common.js

rm js-holding/cards-common.js
