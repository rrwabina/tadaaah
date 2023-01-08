const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

app.get('/', (req, res) => {
  console.log(req.cookies);
  res.send('Cookies: ' + JSON.stringify(req.cookies));
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
