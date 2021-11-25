const events = require("events"),
  util = require("util"),
  // Client constructor
  LDJClient = function (stream) {
    events.EventEmitter.call(this);
    const self = this;
    let buffer = "";
    stream.on("data", function (data) {
      buffer += data;
      let boundary = buffer.indexOf("\n");
      while (boundary !== -1) {
        const input = buffer.substr(0, boundary);
        buffer = buffer.substr(boundary + 1);
        self.emit("message", JSON.parse(input));
        boundary = buffer.indexOf("\n");
      }
    });
    stream.on("error", function () {
      self.emit("error");
    });
    stream.on("close", function () {
      self.emit("close");
    });
  };

util.inherits(LDJClient, events.EventEmitter);
exports.LDJClient = LDJClient;
exports.connect = function (stream) {
  return new LDJClient(stream);
};
