let io = require("./socket").get();

const socketController = {};

io.on("connection", (socket) => {
    socket.on('red-client', (nada)=> {
      io.emit('red', {
        class: 'circle3',
        glow: 'circle3-on',
        color: 'red'
      });
    })

    socket.on('yellow-client', (nada)=> {
      io.emit('yellow', {
        class: 'circle2',
        glow: 'circle2-on',
        color: 'yellow'
      });
    })

    socket.on('green-client', (nada)=> {
      io.emit('green', {
        class: 'circle1',
        glow: 'circle1-on',
        color: 'green'
      });
    })

    socket.on('stop-socket', (nada)=> {

      io.disconnectSockets();

      setTimeout(()=> {
        io.emit('reconnected', 'lights reconnected');
      }, 1000 * 22)
    })

    socket.on('stop-client', (nada)=> {
      io.emit('stop-server', '');
    })

    socket.on('cancel-client', (nada) => {
      io.emit('cancel-server', '');
    })
});

socketController.klk = (req, res) => {
  io.emit("server/random", Math.random());
  res.send("<h1>perfecto!</h1>");
};

module.exports = socketController;
