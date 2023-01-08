const io = require('socket.io')(3000);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (message) => {
    console.log(`received message: ${message}`);
    socket.emit('message', `echo: ${message}`);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
