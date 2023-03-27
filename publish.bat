#!/bin/sh
git add .
git commit -m "Commit message"
git push

echo "NPM VERSION PATCH!"
START npm version patch

echo "VSCE PUBLISH"
vsce publish