#!/bin/sh

export REACT_APP_GIT_SHA=$(git rev-parse --short HEAD)

yarn build:mobile:ios

npx cap add ios

npx cap copy ios

# cordova-res ios --skip-config --copy
yarn resources:ios