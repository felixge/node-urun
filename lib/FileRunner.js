var spawn = require('child_process').spawn;

module.exports = FileRunner;
function FileRunner(options) {
  this._file   = options.file;
  this._bin    = process.execPath;
  this._cwd    = options.cwd || process.cwd();
  this._output = '';
}

FileRunner.prototype.execute = function(cb) {
  var self  = this;
  var child = spawn(this._bin, [this._file]);

  this._capture(child.stdout);
  this._capture(child.stderr);

  child.on('exit', function(code, signal) {
    cb(self._errorFor(code, signal), self._output);
  });
};

FileRunner.prototype._capture = function(stream) {
  var self = this;

  stream.setEncoding('utf8');
  stream.on('data', function(chunk) {
    self._output += chunk;
  });
};

FileRunner.prototype._errorFor = function(code, signal) {
    if (!code && !signal) return;

    var path = this._file;
    if (path.indexOf(this._cwd) === 0) path = path.substr(this._cwd.length + 1);
    var prefix = 'node ' + path + ' died with ';

    if (code) return new Error(prefix + 'code: ' + code);
    if (signal) return new Error(prefix + 'signal: ' + signal);
};
