#!/bin/sh

export REACT_APP_GIT_SHA=$(git rev-parse --short HEAD)

yarn build:mobile:android

npx cap add android

npx cap copy android

# cordova-res android --skip-config --copy
yarn resources:android