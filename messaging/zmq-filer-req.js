const zmq = require("zeromq"),
  [, , filename] = process.argv,
  // create request endpoint
  requester = zmq.socket("req");

// handle replies from responder
requester.on("message", function (data) {
  const response = JSON.parse(data);
  console.log(`Received response:${JSON.stringify(response)}`);
});
requester.connect(`tcp://localhost:5433`);
// send request for content:
console.log(`Sending request for ${filename}`);
requester.send(JSON.stringify({ path: filename }));
