bundle.js: polynomial.js main.js
	browserify main.js -o bundle.js
polynomial.js: polynomial.ts
	tsc polynomial.ts --suppressImplicitAnyIndexErrors
polynomial.ts: polynomial.pegjs
	pegjs --plugin ./node_modules/ts-pegjs/src/tspegjs -o polynomial.ts --cache polynomial.pegjs
main.js: main.ts
	tsc main.ts
