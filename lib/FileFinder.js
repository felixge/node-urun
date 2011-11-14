var path = require('path');
var fs   = require('fs');
var noOp = function() {};

module.exports = FileFinder;
function FileFinder(dir) {
  this._dir = dir;
}

FileFinder.prototype.execute = function(cb) {
  var files = [];
  this._readdir(this._dir, files, function(err) {
    cb(err, files);
  });
};

FileFinder.prototype._readdir = function(dir, results, cb) {
  var self = this;
  fs.readdir(dir, function(err, files) {
    if (err) {
      cb(err);
      cb = noOp;
      return;
    }

    self._inspect(dir, files, results, cb);
  });
};

FileFinder.prototype._inspect = function(dir, files, results, cb) {
  var remaining = files.length;
  var self      = this;

  if (!remaining) return cb(null);

  files.forEach(function(file) {
    var filePath = path.join(dir, file);

    fs.stat(filePath, function(err, stat) {
      if (err) {
        cb(err);
        cb = noOp;
        return;
      }

      remaining--;
      if (stat.isDirectory()) {
        remaining++;
        self._readdir(filePath, results, function(err) {
          if (err) {
            cb(err);
            cb = noOp;
            return;
          }

          remaining--;
          if (!remaining) cb(null);
        });
      } else {
        results.push(filePath);
      }

      if (!remaining) cb(null);
    });
  });
};
