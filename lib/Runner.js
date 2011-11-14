var FileExecutor = require('./FileExecutor');
var EventEmitter = require('events').EventEmitter;
var util         = require('util');

module.exports = Runner;
util.inherits(Runner, EventEmitter);
function Runner(options) {
  this._files = [].concat(options.files);
  this._cwd   = options.cwd || process.cwd();
}

Runner.prototype.execute = function() {
  this.emit('start', [].concat(this._files));
  this._nextFile();
};

Runner.prototype._nextFile = function() {
  var file = this._files.shift();
  if (!file) {
    this.emit('end');
    return;
  }

  var self         = this;
  var executor     = new FileExecutor({file: file, cwd: this._cwd});
  var relativePath = executor.relativePath();

  this.emit('fileStart', relativePath);
  executor.execute(function(err, output) {
    self.emit('fileEnd', relativePath, err, output);
    self._nextFile();
  });
};
