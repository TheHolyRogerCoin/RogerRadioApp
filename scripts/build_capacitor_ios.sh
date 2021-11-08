#!/bin/sh

cross-env NODE_ENV=production NODE_OPTIONS=--max_old_space_size=8192 webpack --config ./webpack/mobile.ts

npx cap add ios

npx cap copy ios

# cordova-res ios --skip-config --copy
yarn resources:ios