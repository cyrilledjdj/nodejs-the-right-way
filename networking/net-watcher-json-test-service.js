"use strict";
const fs = require("fs"),
  net = require("net"),
  [, , filename] = process.argv,
  server = net.createServer(function (connection) {
    // reporting
    console.log("Subscriber connected.");
    connection.write(`{"type": "changed", "file": "targ`);

    // after a one second delay, send the other chunk
    const timer = setTimeout(function () {
      connection.write(`et.txt","timestamp": ${Date.now()}}\n`);
      connection.end();
    }, 1000);

    // clear ttime when the connection ends
    connection.on("end", function () {
      clearTimeout(timer);
      console.log("Subscriber disconnected");
    });
  });

if (!filename) {
  throw Error("No target filename was specified.");
}
server.listen(5432, function () {
  console.log("Listening for subscribers...");
});
