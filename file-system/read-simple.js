const fs = require("fs"),
  [, , filename] = process.argv;
if (!filename) {
  process.exit(0);
}
fs.readFile(filename, function (err, data) {
  if (err) throw err;
  console.log(data.toString());
});
