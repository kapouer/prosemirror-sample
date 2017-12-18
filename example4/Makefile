BROWSERIFY = $(shell node -p 'require.resolve("browserify/bin/cmd.js")') -t [ babelify --presets [ es2015 ] ]

all:
	cp -f ../node_modules/prosemirror-view/style/prosemirror.css bundle.css
	$(BROWSERIFY) main.js --outfile bundle.js

