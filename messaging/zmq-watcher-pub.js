"use strict";
const fs = require("fs"),
  zmq = require("zeromq"),
  publisher = zmq.socket("pub"),
  [, , filename] = process.argv;

fs.watch(filename, function () {
  // send message to any subscribers
  publisher.send(
    JSON.stringify({
      type: "changed",
      file: filename,
      timestamp: Date.now(),
    })
  );
});
publisher.bind("tcp://*:5432", function (err) {
  console.log("Listening for zmq subscribers...");
});
