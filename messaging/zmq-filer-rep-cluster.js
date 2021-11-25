"use strict";
const cluster = require("cluster"),
  fs = require("fs"),
  zmq = require("zeromq");

async function run() {
  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    // master process - create ROUTER and DEaLER sockets, bind endpoints
    const router = zmq.socket("router").bind(`tcp://127.0.0.1:5433`),
      dealer = zmq.socket("dealer").bind("ipc://filer-dealer.ipc");

    // forward messages between router and dealer
    router.on("message", function () {
      const frames = Array.prototype.slice.call(arguments);
      dealer.send(frames);
    });

    dealer.on("message", function () {
      const frames = Array.prototype.slice.call(null, arguments);
      router.send(frames);
    });

    // listen for workers to come online
    cluster.on("online", function (worker) {
      console.log(`Worker ${worker.process.pid} is online.`);
    });

    // fork three worker processes
    for (let _ in [1, 2, 3]) {
      cluster.fork();
    }
  } else {
    // worker process - create REP socket, connect to DEALER
    const responder = zmq.socket("rep");

    responder.on("message", function (data) {
      // parse incoming message
      const request = JSON.parse(data);
      console.log(`${process.pid} received request for: ${request.path}`);

      // read file an reply with content
      fs.readFile(request.path, function (err, data) {
        console.log(`${process.pid} sending response`);
        responder.send(
          JSON.stringify({
            pid: process.pid,
            data: data.toString(),
            timestamp: Date.now(),
          })
        );
      });
    });

    responder.bind("ipc//filer-dealer.ipc");
  }
}

run();
