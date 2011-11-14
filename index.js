var FileFilter   = require('./lib/FileFilter');
var FileFinder   = require('./lib/FileFinder');
var Runner       = require('./lib/Runner');
var BashReporter = require('./lib/reporter/BashReporter');

module.exports = function(dir, include) {
  include = include || /test-.+\.js$/;

  var finder   = new FileFinder(dir);
  var filter   = new FileFilter({include: include});

  finder.execute(function(err, files) {
    if (err) throw err;

    files = filter.filter(files);

    var runner   = new Runner({files: files});
    var reporter = new BashReporter({runner: runner});
    runner.execute();
  });
};
