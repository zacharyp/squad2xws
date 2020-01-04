#!/bin/bash

git submodule foreach git pull origin master

# YASB requires old node version
# nvm use v8.17.0

cd xwing
npm install
grunt

cd ..

rm -rf ./yasb-app
mkdir -p yasb-app
cp -R ./xwing/app/* ./yasb-app/

# nvm use default
