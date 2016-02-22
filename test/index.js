var path = require("path");
var test = require("tape");

var readAnyOneFile = require('..');

test("returns err if files are not array", function(t) {
  t.plan(1);

  readAnyOneFile('file', function(err, file, data) {
    t.notEqual(err, null);
  });
});

test("returns err if files are empty", function(t) {
  t.plan(1);

  readAnyOneFile([], function(err, file, data) {
    t.notEqual(err, null);
  });
});

test("returns err(code=ENOENT) if all files are not found", function(t) {
  t.plan(1);

  readAnyOneFile([path.join(__dirname, 'not_found_x.json'), path.join(__dirname, 'not_found_y.js')], function(err, file, data) {
    t.equal(err.code, 'ENOENT');
  });
});

test("returns filename and data of the first found file", function(t) {
  t.plan(3);

  readAnyOneFile([path.join(__dirname, 'not_found_x.json'), path.join(__dirname, '/testdata/found_y.js'), path.join(__dirname, '/testdata/found_x.js')], function(err, file, data) {
    t.equal(err, null);
    t.equal(path.basename(file), 'found_y.js');
    t.equal(data.toString(), "found\n");
  });
});
