var assert     = require('assert');
var FileFinder = require('../../../lib/FileFinder');
var path       = require('path');
var fixture    = path.join(__dirname, '../../fixture');

var finder = new FileFinder(fixture);
var files  = [];
finder.execute(function(err, _files) {
  if (err) throw err;
  files = _files;
});

process.on('exit', function() {
  files = files
    .filter(function(file) {
      return !/un~$/.test(file);
    })
    .sort(function(a, b) {
      if (a === b) return 0;
      return (a > b)
        ? 1
        : -1;
    });

  assert.deepEqual(files, [
    fixture + '/1.txt',
    fixture + '/2.js',
    fixture + '/a/a1.txt',
    fixture + '/a/a2.js',
    fixture + '/b/b1.txt',
    fixture + '/b/b2.js',
    fixture + '/b/deep/file.js',
  ]);
});
