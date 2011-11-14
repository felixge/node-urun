var FileFilter = require('./lib/FileFilter');
var FileFinder = require('./lib/FileFinder');
var FileRunner = require('./lib/FileRunner');

module.exports = function(dir, include) {
  var finder = new FileFinder(dir);
  finder.execute(function(err, files) {
    if (err) throw err;

    var filter = new FileFilter({include: include});
    files = filter.filter(files);

    console.error(files);
  });
};
