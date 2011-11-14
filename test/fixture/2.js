process.stderr.write('I am stderr\n');
setTimeout(function() {
  process.stdout.write('I am stdout\n');
  process.exit(1);
}, 50)
