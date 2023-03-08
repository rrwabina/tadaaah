// io.js
const { global } = require('./constants');
const debug  = require('debug') ('${global.APP_NAME}:io');
const server = require('http').createServer();

const io = require('socket.io')(server, {
    transports: ['websocket', 'polling']
});

debug('Start socket.io listering');
io.listen(3000);
module.exports = io;






const { messageTypes, global } = require('./constants');
const io = require('./io');
const debug = require('debug')(`${global.APP_NAME}:monitorJoinLeaves`);


// module that handles broadcasting messages
module.exports = () => {
  io.on('connection', (client) => {
    broadcastJoinNotification(client);
    broadcastConnectionCount();
    client.on('disconnect', () => {
      broadcastConnectionCount();

      // client disconnects
      broadcastDisconnect();
    });
  });
}

function broadcastDisconnect() {
  debug('send disconnect message');
  io.emit(messageTypes.MESSAGE_TEXT, `has disconnected`);
}
function broadcastConnectionCount() {
  io.clients((error, clients) => {
    if (error) throw error;
    const currentlyConnected = `${clients.length} currently connected`;
    debug(currentlyConnected);
    io.emit(messageTypes.MESSAGE_TEXT, currentlyConnected);
  });
}

function broadcastJoinNotification(client) {
  const joinNotification = `${client.id} has joined the room`
  debug(joinNotification);
  io.emit(messageTypes.MESSAGE_TEXT, joinNotification);
}