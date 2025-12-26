const http = require("http")

const server = http.createServer((request,response) => {
    console.log("url:" + request.url,"method:"+request.method)
    if(request.url === "/send" ){

        
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

 