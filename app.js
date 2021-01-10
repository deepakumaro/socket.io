const http = require('http');
const express = require('express');
const app = express ();
const env = require('dotenv').config();
const path = require('path');
const socketIo = require('socket.io');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIo(server);

const indexRouter = require('./src/index');

const publicDirPath = path.join(__dirname,'/public');
app.use(express.static(publicDirPath));

// app.use('/',indexRouter);


// let count = 0;

io.on('connection',(socket)=>{
    console.log("new websocket connection is deceted",socket.id);
    socket.emit("message",`welcome ${socket.id}`);
    socket.on('sendMessage',(message)=>{
        io.emit('message',message);
    })
});



server.listen(port,()=>{
    console.log(`express server is up and running on port ${port}`);
});