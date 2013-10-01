module.exports = BashTapReporter;

function BashTapReporter(options) {
  this._runner      = options.runner;
  this._verbose     = options.verbose;
  this._fail        = false;
  this._count       = 1;

  this._runner.on('start', this._handleStart.bind(this));
  this._runner.on('fileEnd', this._handleFileEnd.bind(this));
  this._runner.on('end', this._handleEnd.bind(this));
}

BashTapReporter.prototype._handleStart = function(files) {
  console.log('%d..%d', 1, files.length);
};

BashTapReporter.prototype._handleFileEnd = function(file, err, output) {
  if (err) {
    console.log('not ok %d %s', this._count, this._tapTitle(file));
    this._fail = true;
  } else {
    console.log('ok %d %s', this._count, this._tapTitle(file));
  }
  if (output && (this._verbose || err)) console.log(output.replace(/^/gm, '  '));
  this._count++;
};

BashTapReporter.prototype._handleEnd = function() {
  var exitCode = (this._fail)
    ? 1
    : 0;

  process.exit(exitCode);
};

BashTapReporter.prototype._tapTitle = function(title) {
  return title.replace(/#/g, '');
}
