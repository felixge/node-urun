module.exports = FileFilter;
function FileFilter(options) {
  options = options || {};

  this._include = options.include;
}

FileFilter.prototype.filter = function(files) {
  var self = this;

  return files.filter(function(file) {
    if (!self._include) return true;

    return self._include.test(file);
  });
};
