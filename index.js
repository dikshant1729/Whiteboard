const express = require('express')
const app =  express()
const httpserver = require('http').createServer(app)
const io = require('socket.io')(httpserver)

let connections = [];

io.on('connect' , (socket) =>{
   connections.push(socket);
   console.log(`${socket.id} has connected`);

   socket.on('draw' , (data) =>{
     connections.forEach(con =>{
        if(con.id !== socket.id){
            con.emit('ondraw' , {x: data.x , y: data.y})
        }
     })
   })
 
   socket.on('down' , (data) =>{
    connections.forEach(con =>{
        if(con.id !== socket.id){
            con.emit('ondown' , {x: data.x , y: data.y})
        }
     })
   })

   socket.on('disconnect' , (reason) => {
      connections = connections.filter((con) => con.id!==socket.id);
   });
});

app.use(express.static('public'));

const PORT = process.env.PORT || 8080
httpserver.listen(PORT , () => console.log(`server started at ${PORT}`))