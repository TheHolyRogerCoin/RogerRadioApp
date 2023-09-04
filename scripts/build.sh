#!/bin/sh

export BUILD_DOMAIN=${BUILD_DOMAIN:-$(cat .domains)}
[ -n "$BUILD_EXPIRE" ] && export REACT_APP_BUILD_EXPIRE=$(date -d "+${BUILD_EXPIRE}" +%s000)

yarn build
