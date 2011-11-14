var assert  = require('assert');
var Runner  = require('../../../lib/Runner');
var path    = require('path');
var fixture = path.join(__dirname, '../../fixture');

var files  = [fixture + '/2.js', fixture + '/a/a2.js'];
var runner = new Runner({files: files, cwd: fixture});

var events = [];
runner
  .on('fileStart', function(relativePath) {
    events.push(['fileStart', relativePath]);
  })
  .on('fileEnd', function(relativePath, err, output) {
    events.push(['fileEnd', relativePath, err, output]);
  })
  .on('end', function() {
    events.push(['end']);
  })
  .execute();

process.on('exit', function() {
  assert.deepEqual(events[0], ['fileStart', '2.js']);
  assert.deepEqual(events[1].slice(0, 2), ['fileEnd', '2.js']);
  assert.ok(events[1].slice(2, 3)[0] instanceof Error);
  assert.equal(events[1].slice(3, 4)[0], 'I am stderr\nI am stdout\n');

  assert.deepEqual(events[2], ['fileStart', 'a/a2.js']);
  assert.deepEqual(events[3], ['fileEnd', 'a/a2.js', null, '']);

  assert.deepEqual(events[4], ['end']);
});
