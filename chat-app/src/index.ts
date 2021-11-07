import express from 'express';
import http from 'http';
import path from 'path'
import { Socket } from 'socket.io';
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = process.env.PORT || 3000;

const publicPathDir = path.join(__dirname, '../public');

app.use(express.static(publicPathDir));


io.on('connection', (socket : Socket) => {
  console.log('New websocket connection');
  const welcome : string = "welcome!"
  socket.emit('message', welcome);
  socket.broadcast.emit('message', 'A new user has joined');

  socket.on('sendMessage', (message) => {
    io.emit('message', message);
  })

  socket.on('disconnect', () => {
    io.emit('message', 'A user has left');
  })
})

server.listen(port, () => {
  console.log(`listening on port ${port}`);
})
