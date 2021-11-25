const fs = require("fs"),
  filename = process.argv[2];
if (!filename) {
  throw new Error("A file to watch must be specified!");
}
fs.watch(filename, () => {
  console.log("File", filename, "just changed!");
});
console.log("Now watching", filename, "for changes...");
