#!/bin/sh

cross-env APP_VERSION=$(cat VERSION) NODE_ENV=production NODE_OPTIONS=--max_old_space_size=8192 webpack --config ./webpack/mobile_android.ts

npx cap add android

npx cap copy android

# cordova-res android --skip-config --copy
yarn resources:android