var str  = module.exports;
var util = require('util');

// custom / simplified flavor of sprintf
str.sprintf = function() {
  var args = Array.prototype.slice.call(arguments);
  var str = args.shift();

  return str.replace(/%[so]/g, function(m, i, s) {
    var arg = args.shift();
    if (m == '%o') {
      return util.inspect(arg);
    }

    if (!arg && arg !== 0) {
      return '';
    }

    return arg.toString();
  });
};

str.repeat = function(string, times) {
  var repeated = '';
  for (var i = 0; i < times; i++) {
    repeated += string;
  }

  return repeated;
};
