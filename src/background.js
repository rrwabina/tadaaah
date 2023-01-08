const socket = io('http://localhost:3000');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'sendMessage') {
    socket.emit('message', request.data);
  }
});

socket.on('message', (data) => {
  chrome.runtime.sendMessage({ action: 'receiveMessage', data });
});
