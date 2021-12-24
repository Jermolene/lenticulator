#!/bin/bash

# Make tiddlers from the site files

# Clear output

rm -rf ./output || exit 1

mkdir -p ./output || exit 1

mkdir -p ./output/tiddlers || exit 1

# Take a screenshot of the site

node ./bin/take-screenshot.js || exit 1

# Load the tiddlers from the src directory and output them to the output directory

npx tiddlywiki \
	--load ./src \
	--output ./output/tiddlers \
	--render "[prefix[lenticulator]]" "[encodeuricomponent[]addsuffix[.json]]" "text/plain" "$:/core/templates/json-tiddler" || exit 1

