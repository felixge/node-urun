var assert       = require('assert');
var FileExecutor = require('../../../lib/FileExecutor');
var path         = require('path');
var rootDir      = path.join(__dirname, '../../..');
var fixture      = path.join(__dirname, '../../fixture/2.js');

var executor   = new FileExecutor({file: fixture, cwd: rootDir});
var executed = false;
executor.execute(function(err, output) {
  assert.equal(err.message, 'node test/fixture/2.js died with code: ' + 1);
  assert.equal(output, 'I am stderr\nI am stdout\n');

  executed = true;
});

process.on('exit', function() {
  assert.ok(executed);
});
