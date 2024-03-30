const app = require('express')();
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname + '/index.html'));
});

app.get('/style.css', (req, res) => {
  res.sendFile(join(__dirname + '/style.css'));
});

app.get('/script.js', (req, res) => {
  res.sendFile(join(__dirname + '/script.js'));
});

io.on('connection', (socket) => {
  socket.on('chat message', (data) => {
    io.emit('chat message', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
