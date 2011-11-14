var test       = require('utest');
var assert     = require('assert');
var FileExecutor = require('../../lib/FileExecutor');

test('FileExecutor', {
  'relativePath': function() {
    var runner = new FileExecutor({file: '/a/b/c', cwd: '/a'});
    assert.equal(runner.relativePath(), 'b/c');
  },
});
