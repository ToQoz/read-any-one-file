# read-any-one-file

reads any one file

## Usage

```javascript
var readAnyOneFile = require('read-any-one-file');

readAnyOneFile(['config.json', 'config.yml'], function(err, file, data) {
  if (err) {
    console.error(err);
  } else {
    console.log(file, data);
  }
});
```

## API

```javascript
var readAnyOneFile = require('read-any-one-file');
```

### readAnyOneFile

The function reads any one file

- Arguments
  - files - **required** - `Array<String>`
  - cb - **required** - `function(err, file, data)`
    - Arguments (cb)
      - err - `Error`
      - file - `String` - the file's path
      - data - `Buffer` - the file's data
