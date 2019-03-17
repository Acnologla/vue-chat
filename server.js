const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
var app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 80;
const server = app.listen(port);
const io = require('socket.io')(server);

/*io.configure(function () { 
    io.set("transports", ["xhr-polling"]); 
    io.set("polling duration", 10); 
  });*/
  let conected = []
io.on('connection', function(socket) {
  var response = false

 socket.on('send2', function(data) {
  socket.emit("respondeu",data)
  if (!conected.includes(data.user)){
  conected.push(data.user)
  io.emit("novo",{
      users: conected
  })
}
  socket.username = data.user
  response = true
});
    socket.on('send', function(data) {
        io.emit('back', data)
    });
  
   let int =  setInterval(function(){
      if (!response){
         conected.splice(conected.indexOf(socket.username),1)
         io.emit("novo",conected)
         clearInterval(int)
        return socket.disconnect()
      }else {
        response = false
      }
    },5000)
});