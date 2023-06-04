const http = require('http');
const cookie = require('cookie');
const fs = require('fs');

const server = http.createServer((request, response) => {
  const cookies = cookie.parse(request.headers.cookie || '');
  fs.writeFile('cookies.txt', JSON.stringify(cookies), (err) => {
    if (err) throw err;
    console.log('Cookies saved to cookies.txt');
  });

  response.end('Cookies received');
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

// ==============================================================================


