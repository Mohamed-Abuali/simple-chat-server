const http = require("http")
import {Server}  from "socket.io"

const server = http.createServer((request,response) => {
      response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    console.log("url:" + request.url,"method:"+request.method)

    if (request.method === 'OPTIONS') {
        response.writeHead(204);
        response.end();
        return;
    }

    if(request.url === "/send" && request.method === "POST"){

        
        let body = "";
        request.on("data",chunk => {
            body += chunk.toString();
        })
        request.on("end", () => {
            try{
                console.log(body)
            const data  = JSON.parse(body)
        const { senderId, receiverId, message } = data;

        console.log(senderId, receiverId, message);
                response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ success: true }));
      } catch (err) {
        response.writeHead(400);
        response.end("Invalid JSON");
      }
        })
    }else {
    response.writeHead(404);
    response.end("Not Found");
  }
})
server.listen(3000,() => {
    console.log("server is running on port 3000")
})



 