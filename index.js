// const http = require("http")
import {Server}  from "socket.io"




const io = new Server(8000,{
  cors:{origin:"*"}
  
})
io.on("connection",(socket) => {

  console.log("user connected",socket.id)
  socket.on("join",(userid) => {
    socket.join(userid)
    console.log(userid)
  })
  socket.on("pri-msg",({from,to,msg}) => {
    io.to(to).emit("msg",{
      from,
      to,
      msg
    })
  })

  socket.on("message",(data) => {
    console.log(data)
    socket.emit("reply","Hello Client")
  })
});
 