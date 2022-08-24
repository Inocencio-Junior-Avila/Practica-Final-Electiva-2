let io;

module.exports = {
  init: (server) => {
    io = require('socket.io')(server)
    return io;
  },
  get: () => {
    if (!io) {
      throw new Error("socket is not initialized");
    }
    return io;
  }
};