"use strict";
const { watch } = require("fs"),
  { spawn } = require("child_process"),
  [, , filename] = process.argv;

if (!filename) {
  throw Error("A file to watch must be specified");
}

watch(filename, function () {
  const ls = spawn("ls", ["-lh", filename]);
  let output = "";
  ls.stdout.on("data", function (chunk) {
    output += chunk.toString();
  });
  ls.on("close", function () {
    const parts = output.split(/\s+/);
    console.dir([parts[0], parts[4], parts[8]]);
  });
});
console.log("Now watching", filename, "for changes...");
