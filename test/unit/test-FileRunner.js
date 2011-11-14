var test       = require('utest');
var assert     = require('assert');
var FileRunner = require('../../lib/FileRunner');

test('FileRunner', {
  'relativePath': function() {
    var runner = new FileRunner({file: '/a/b/c', cwd: '/a'});
    assert.equal(runner.relativePath(), 'b/c');
  },
});
