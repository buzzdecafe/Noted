#!/bin/bash

set -e 
set -x

npm run build
git checkout gh-pages

rm -rf ./docs/*
cp -Rp ./dist/* docs/

git add --all .
git commit -m "publish latest"
git push

git checkout main
