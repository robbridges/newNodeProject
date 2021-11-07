import express from 'express';
import http from 'http';
import path from 'path'
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = process.env.PORT || 3000;

const publicPathDir = path.join(__dirname, '../public');

app.use(express.static(publicPathDir));

io.on('connection', () => {
  console.log('New websocket connection');
})

server.listen(port, () => {
  console.log(`listening on port ${port}`);
})
