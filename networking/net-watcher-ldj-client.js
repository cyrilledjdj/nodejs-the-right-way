"use strict";
const net = require("net"),
  ldj = require("./ldj"),
  netClient = net.connect({ port: 5432 }),
  ldjClient = ldj.connect(netClient);
ldjClient.on("message", function ({ type, file, timestamp }) {
  if (type === "watching") {
    console.log(`Now watching: ${file}`);
  } else if (type === "changed") {
    console.log(
      `File '${file}' changed at ${new Date(timestamp).toDateString()}`
    );
  } else {
    throw Error(`Unrecognized message type: ${type}`);
  }
});

ldjClient.on("error", function () {
  console.log("Service disconnected.");
});
ldjClient.on("close", function () {
  console.log("Service closed.");
});