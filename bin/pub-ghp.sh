#!/bin/sh

rm -rf ./docs/*
cp -Rp ./dist/* docs/

git add --all .
git commit -m "publish latest"
git push
