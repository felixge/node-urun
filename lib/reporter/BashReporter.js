var str = require('../str');

module.exports = BashReporter;
function BashReporter(options) {
  this._runner      = options.runner;
  this._verbose     = options.verbose;
  this._currentFile = null;
  this._lastLine    = null;
  this._start       = null;
  this._fail        = 0;
  this._pass        = 0;
  this._total       = 0;
  this._interval    = null;

  this._runner.on('start', this._handleStart.bind(this));
  this._runner.on('fileStart', this._handleFileStart.bind(this));
  this._runner.on('fileEnd', this._handleFileEnd.bind(this));
  this._runner.on('end', this._handleEnd.bind(this));
}

BashReporter.prototype._handleStart = function(files) {
  this._start    = Date.now();
  this._total    = files.length;
  this._interval = setInterval(this.updateProgress.bind(this), 1000);
};

BashReporter.prototype._handleFileStart = function(file) {
  this._currentFile = file;
  this.updateProgress();
};

BashReporter.prototype._handleFileEnd = function(file, err, output) {
  if (output && (this._verbose || err)) {
    if (output.substr(0, 1) !== '\n') output = '\n' + output;
    output = output.replace(/^/mg, '  ');
    process.stdout.write('\n' + output + '\n');
  }

  if (err) {
    this._fail++;
  } else {
    this._pass++;
  }

  this.updateProgress();
};

BashReporter.prototype._handleEnd = function() {
  process.stdout.write('\n');
  clearInterval(this._interval);

  var exitCode = (this._fail > 0)
    ? 1
    : 0;

  process.exit(exitCode);
};

BashReporter.prototype.updateProgress = function() {
  var template = '\r[%s %s %s/%s %s node %s]';

  var line = str.sprintf(
    template,
    this.elapsedTime(),
    this._fail,
    this._pass,
    this._total,
    this.progress(),
    this._currentFile
  );

  this.clearLine();
  process.stdout.write(line);
  this._lastLine = line;
};

BashReporter.prototype.clearLine = function() {
  if (!this._lastLine) return;

  var spaces = str.repeat(' ', this._lastLine.length);
  process.stdout.write('\r' + spaces + '\r');
};

BashReporter.prototype.elapsedTime = function(showMs) {
  var duration = new Date - this._start;

  var seconds = Math.floor((duration) / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours   = Math.floor(minutes / 60);

  seconds -= (minutes * 60) - (hours * 60 * 60);
  minutes -= hours * 60;

  if (minutes < 10) minutes = '0' + minutes;
  if (seconds < 10) seconds = '0' + seconds;

  return hours + ':' + minutes + ':' + seconds;
};

BashReporter.prototype.progress = function() {
  var index = this._fail + this._pass;
  return ((index) * 100 / this._total).toFixed(1) + '%';
};
