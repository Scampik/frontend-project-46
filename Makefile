install:
	npm ci
publish:
	npm publish --dry-run
lint:
	npx eslint .
gf:
	node bin/gendiff.js -h
test:
	NODE_OPTIONS=--experimental-vm-modules npx jest