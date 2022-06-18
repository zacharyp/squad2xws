#!/bin/bash

pbpaste > js-holding/cards-common.js

cat js-holding/cards-common.header js-holding/cards-common.js >> src/services/yasb/lib/cards-common.js

rm js-holding/cards-common.js
