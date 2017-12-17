BROWSERIFY = $(shell node -p 'require.resolve("browserify/bin/cmd.js")') -t [ babelify --presets [ es2015 ] ]

build-examples: build-example1 build-example2

build-example1:
	cp -f node_modules/prosemirror-view/style/prosemirror.css example1/bundle.css
	$(BROWSERIFY) example1/main.js --outfile example1/bundle.js

build-example2:
	cp -f node_modules/prosemirror-view/style/prosemirror.css example2/bundle.css
	$(BROWSERIFY) example2/main.js --outfile example2/bundle.js

