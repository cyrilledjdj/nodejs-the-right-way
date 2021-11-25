"use strict";
const { watch } = require("fs"),
  { spawn } = require("child_process"),
  [, , filename] = process.argv;

if (!filename) {
  throw Error("A file to watch must be specified");
}

watch(filename, function () {
  const { stdout } = spawn("ls", ["-ls", filename]);
  stdout.pipe(process.stdout);
});
console.log("Now watching", filename, "for changes...");
