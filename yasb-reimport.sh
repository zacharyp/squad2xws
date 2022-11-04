#!/bin/bash

# reimports the YASB file cards-common.coffee for any updates upstream, and re-converts it to javascript for use by typescript code

git submodule foreach git pull origin master

cat xwing/coffeescripts/content/cards-common.coffee | pbcopy

### manually paste buffer into
# https://decaffeinate-project.org/repl/#?useCS2=true&useJSModules=false&loose=false&optionalChaining=false&evaluate=true&stage=full&code=

# then copy the decaffeinated javascript into buffer, then run yasb-reimport2.sh
