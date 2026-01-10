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
    socket.emit("reply",true)
  })

  
  socket.on("create",(userid,roomName) => {
    const roomid = Math.floor(Math.random() * 9999) +1;
    const roomInfo = {
      author:userid,
      name:roomName
    }
    if(!rooms[roomid]) rooms[roomid] = []
    rooms[roomid].push(roomInfo)
    socket.emit("roomid",roomid)
  })



  socket.on("join",(roomid) => {
    if(!rooms[roomid]) {
      socket.emit("reply",`this room ${roomid} don not exist`)
    }else{
    socket.join(roomid)
    socket.emit("reply",`user has joined the room ${roomid}`)
    console.log(roomid)
    }

  })


  socket.on("pri-msg", ({ from, to, msg }) => {
    const chatID = `${from}${to}:`;
  
    // store
    if (!messages[chatID]) messages[chatID] = [];
    messages[chatID].push(msg);
  
    // send history to receiver
    io.to(to).emit("msg", { from, to, hist: messages[chatID] });
  });



  
  socket.on("disconnect",() => {
    socket.emit("reply",false)
  })
});