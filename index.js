// const http = require("http")
import {Server}  from "socket.io"


const messages = {};   // plain object, not array
const rooms = {}
const io = new Server(8000,{
  cors:{origin:"*"}
  
})
io.on("connection",(socket) => {

  console.log("user connected",socket.id)
  socket.emit("connected",() => {
    return true
  })
  socket.on("create",(userid,roomName) => {
    const roomid = Math.random(1,9999)
    rooms[roomid].push({
      author:userid,
      name:roomName
    })
    socket.emit("roomid",roomid)
  })
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
  socket.on("disconnect",() => {
    return false
  })
});