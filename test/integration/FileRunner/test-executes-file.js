var assert     = require('assert');
var FileRunner = require('../../../lib/FileRunner');
var path       = require('path');
var rootDir    = path.join(__dirname, '../../..');
var fixture    = path.join(__dirname, '../../fixture/2.js');

var runner   = new FileRunner({file: fixture, cwd: rootDir});
var executed = false;
runner.execute(function(err, output) {
  assert.equal(err.message, 'node test/fixture/2.js died with code: ' + 1);
  assert.equal(output, 'I am stderr\nI am stdout\n');

  executed = true;
});

process.on('exit', function() {
  assert.ok(executed);
});
