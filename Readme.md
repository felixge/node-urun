# urun

The minimal test runner.

## Why yet another test runner?

I wanted something simple, that just runs test files and behaves like a good
UNIX citizen. Now it exists.

## Install

```
npm install urun
```

## Usage

In order to execute all test-*.js files inside a given directory, simply do:

```js
require('urun')(__dirname, /test-.*\.js$/);
```

You now get a nice progress indication, but that's it.  There are no more
features.

## License

This module is licensed under the MIT license.
