var test       = require('utest');
var assert     = require('assert');
var FileFilter = require('../../lib/FileFilter');

test('FileFilter', {
  'does not modify file list when no args are given': function() {
    var filter   = new FileFilter();
    var files    = ['a', 'b', 'c'];
    var filtered = filter.filter(files);

    assert.deepEqual(filtered, ['a', 'b', 'c']);
  },
  'filters files when asked to': function() {
    var filter   = new FileFilter({include: /test-.*\.js$/});
    var files    = ['a', 'test-fun.js', 'test-another.js.something'];
    var filtered = filter.filter(files);

    assert.deepEqual(filtered, ['test-fun.js']);
  }
});
