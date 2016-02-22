var fs = require("fs");

module.exports = function(files, cb) {
  if (!Array.isArray(files)) {
    cb(new Error("files must be an Array"), null);
    return;
  }

  if (files.length === 0) {
    cb(new Error("files must be contain 1 file at least"), null);
    return;
  }

  var _files = files.map(function(f) { return f; });

  _readAnyOneFile(_files, function(err, file, data) {
    if (err && err.code === 'ENOENT') {
      err.path = files.join("|");
      err.message = "ENOENT: no such file or directory, open '" + err.path + "']";
    }

    cb(err, file, data);
  });
};

function _readAnyOneFile(files, cb) {
  var file = files.shift();

  fs.readFile(file, function(err, data) {
    if (err) {
      if (err.code === 'ENOENT' && files.length > 0) {
        _readAnyOneFile(files, cb);
      } else {
        cb(err, null);
      }
    } else {
      cb(null, file, data);
    }
  });
}
