// const http = require("http")
import {Server}  from "socket.io"


let messages = []

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
    if(messages.includes(`${from}${to}`)){
    messages[`${from}${to}`].messages.push(msg)
    }else{
      const chatID = `${from}${to}`;
      messages.push({
       [`${from}${to}`]:{
          messages:msg
        }
      })
    }
    const hist = messages.find(m => m.chatID === `${from}${to}`)?.messages ?? [];
    io.to(to).emit("msg",{
      from,
      to,
      hist
    })
  })

  socket.on("message",(data) => {
    console.log(data)
    socket.emit("reply","Hello Client")
  })
});