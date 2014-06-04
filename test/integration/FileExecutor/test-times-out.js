var assert       = require('assert');
var FileExecutor = require('../../../lib/FileExecutor');
var path         = require('path');
var rootDir      = path.join(__dirname, '../../..');
var fixture      = path.join(__dirname, '../../fixture/3.js');

var executor   = new FileExecutor({file: fixture, cwd: rootDir, timeout: 50});
var executed = false;
executor.execute(function(err, output) {
  assert.equal(output, 'test/fixture/3.js timed out');
  executed = true;
});

process.on('exit', function() {
  assert.ok(executed);
});
