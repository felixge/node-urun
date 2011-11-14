var assert  = require('assert');
var Runner  = require('../../../lib/Runner');
var path    = require('path');
var fixture = path.join(__dirname, '../../fixture');

var files  = [fixture + '/2.js', fixture + '/a/a2.js'];
var runner = new Runner({files: files, cwd: fixture});

var events = [];
runner
  .on('start', function(_files) {
    events.push(['start', _files]);
  })
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
  var event = events.shift();
  assert.deepEqual(event, ['start', files]);

  event = events.shift();
  assert.deepEqual(event, ['fileStart', '2.js']);

  event = events.shift();
  assert.deepEqual(event.slice(0, 2), ['fileEnd', '2.js']);
  assert.ok(event.slice(2, 3)[0] instanceof Error);
  assert.equal(event.slice(3, 4)[0], 'I am stderr\nI am stdout\n');

  event = events.shift();
  assert.deepEqual(event, ['fileStart', 'a/a2.js']);

  event = events.shift();
  assert.deepEqual(event, ['fileEnd', 'a/a2.js', null, '']);

  event = events.shift();
  assert.deepEqual(event, ['end']);
});
