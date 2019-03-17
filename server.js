const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 80;
app.listen(port);
const io = require('socket.io')(server);

io.on('connection', function(socket) {
  var response = false

 socket.on('send2', function(data) {
  socket.emit("respondeu",data)
  response = true
});
    socket.on('send', function(data) {
        io.emit('back', data)
    });
  
    setInterval(function(){
      if (!response) return socket.disconnect()
      else {
        response = false
      }
    },5000)
});