var spawn = require('child_process').spawn;

module.exports = FileExecutor;
function FileExecutor(options) {
  this._file     = options.file;
  this._bin      = process.execPath;
  this._cwd      = options.cwd || process.cwd();
  this._timeout  = options.timeout || 1000;
  this._output   = '';
}

FileExecutor.prototype.execute = function(cb) {
  var self  = this;
  var child = spawn(this._bin, [this._file]);

  this._capture(child.stdout);
  this._capture(child.stderr);

  var timeout = setTimeout(function () {
    self._output += self.relativePath() + ' timed out';
    child.kill();
  }, this._timeout);

  child.on('exit', function(code, signal) {
    clearTimeout(timeout);
    cb(self._errorFor(code, signal), self._output);
  });
};

FileExecutor.prototype._capture = function(stream) {
  var self = this;

  stream.setEncoding('utf8');
  stream.on('data', function(chunk) {
    self._output += chunk;
  });
};

FileExecutor.prototype._errorFor = function(code, signal) {
    if (!code && !signal) return null;

    var prefix = 'node ' + this.relativePath() + ' died with ';

    if (code) return new Error(prefix + 'code: ' + code);
    if (signal) return new Error(prefix + 'signal: ' + signal);
};

FileExecutor.prototype.relativePath = function() {
  var path = this._file;
  return (path.indexOf(this._cwd) === 0)
    ? path = path.substr(this._cwd.length + 1)
    : path;
};
