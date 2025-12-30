// const http = require("http")
import {Server}  from "socket.io"


const messages = {};   // plain object, not array

const io = new Server(8000,{
  cors:{origin:"*"}
  
})
io.on("connection",(socket) => {

  console.log("user connected",socket.id)
  socket.on("join",(userid) => {
    socket.join(userid)
    socket.emit("reply","user has joined the room")
    console.log(userid)
  })
  socket.on("pri-msg", ({ from, to, msg }) => {
    const chatID = `${from}${to}`;
  
    // store
    if (!messages[chatID]) messages[chatID] = [];
    messages[chatID].push(msg);
  
    // send history to receiver
    io.to(to).emit("msg", { from, to, hist: messages[chatID] });
  });

  socket.on("message",(data) => {
    console.log(data)
    socket.emit("reply","Hello Client")
  })
});