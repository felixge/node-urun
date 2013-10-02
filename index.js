var FileFilter   = require('./lib/FileFilter');
var FileFinder   = require('./lib/FileFinder');
var Runner       = require('./lib/Runner');

module.exports = function(dir, options) {
  var options  = options || {};
  var include  = options.include || /test-.+\.js$/;
  var verbose  = options.verbose;
  if (verbose !== true) verbose = false;

  var Reporter = require('./lib/reporter/'
    + (process.env.REPORTER || options.reporter || 'BashReporter'));

  var finder   = new FileFinder(dir);
  var filter   = new FileFilter({include: include});

  finder.execute(function(err, files) {
    if (err) throw err;

    files = filter.filter(files);

    var runner   = new Runner({files: files});
    var reporter = new Reporter({runner: runner, verbose: verbose});
    runner.execute();
  });
};
