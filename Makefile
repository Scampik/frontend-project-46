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
json:
	gendiff __fixtures__/file1.json  __fixtures__/file2.json
yml:
	gendiff __fixtures__/file1.yml  __fixtures__/file2.yml
plain:
	gendiff --format plain __fixtures__/file1.json  __fixtures__/file2.json

	