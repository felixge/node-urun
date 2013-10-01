# urun

[![Build Status](https://secure.travis-ci.org/felixge/node-urun.png)](http://travis-ci.org/felixge/node-urun)

The minimal test runner.

## Why yet another test runner?

I wanted something simple, that just runs test files, shows progress, and
behaves like a good UNIX citizen. Now it exists.

## Install

```
npm install urun
```

## Usage

In order to execute all test-*.js files inside a given directory, simply do:

```js
require('urun')(__dirname);
```

You now get a nice progress indication, as well as detailed output for each
test that fails. By default output is only printed for tests that fail. To enable
detailed output for all tests, including those passing, include verbose: true
in the list of options.

```js
require('urun')(__dirname, { verbose: true });
```

Another feature is specifying a regex for the files to run (default is
`/test-.+\.js$/`), for example:

```js
require('urun')(__dirname, { include: /.+Test\.js$/ });
```

## Reporter

```js
require('urun')(__dirname, { reporter: 'BashReporter' }); // default
require('urun')(__dirname, { reporter: 'BashTapReporter' }); // tap compliant output
```

## License

This module is licensed under the MIT license.
