"use strict";
const zmq = require("zeromq"),
  // create subscriber endpoint
  subscriber = zmq.socket("sub");

// subscribe to all messages
subscriber.subscribe("");
subscriber.on("message", function (data) {
  const { file, type, timestamp } = JSON.parse(data),
    date = new Date(timestamp);
  console.log(`File '${file}' ${type || "changed"} at ${date}`);
});

// connect to publisher
subscriber.connect("tcp://localhost:5432");
