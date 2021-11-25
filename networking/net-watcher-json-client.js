"use strict";
const net = require("net"),
  client = net.connect({ port: 5432 });

client.on("data", function (data) {
  const { type, timestamp, file } = JSON.parse(data);
  if (type === "watching") {
    console.log("Now watching:", file);
  } else if (type === "changed") {
    const date = new Date(timestamp);
    console.log("File '", file, "'changed at", date.toDateString());
  } else {
    throw Error("Unrecognized message type: " + type);
  }
});
// cleanup
client.on("error", function () {
  console.log("Service disconnected.");
});
