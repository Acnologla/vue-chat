const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
var app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 80;
const server = app.listen(port);
const io = require('socket.io')(server);


io.on('connection', function(socket) {
  let {username,code} = socket.handshake.query
  if (!username || !code) return
  socket.join(code)
  socket.username = username
  var response = false
  if (!io.sockets.adapter.rooms[code]) return;
  if (!io.sockets.adapter.rooms[code].messages) io.sockets.adapter.rooms[code].messages = []
  io.to(code).emit("novo",{
      users: Object.keys(io.sockets.adapter.rooms[code].sockets).map(id => io.sockets.connected[id]).map(a => a.username)
  })
  socket.on("users",function(){
    if (!io.sockets.adapter.rooms[code]) return;
    io.to(code).emit("novo",{
      users: Object.keys(io.sockets.adapter.rooms[code].sockets).map(id => io.sockets.connected[id]).map(a => a.username)
    })
  })
 socket.on('send2', function(data) {
  socket.emit("respondeu",data)
   response = true
});
      socket.emit("messages",io.sockets.adapter.rooms[code].messages)
    socket.on('send', function(data) {
      io.sockets.adapter.rooms[code].messages.push(data)
      io.to(code).emit('back', data)
    });
  
   let int =  setInterval(function(){
      if (!response){
        if (io.sockets.adapter.rooms[code]){
         io.to(code).emit("novo",{
           users:Object.keys(io.sockets.adapter.rooms[code].sockets).map(id => io.sockets.connected[id]).map(a => a.username)
         })}
         clearInterval(int)
         socket.leave(code)
        return socket.disconnect()
      }else {
        response = false
      }
    },2000)
});