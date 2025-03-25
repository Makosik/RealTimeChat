const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require("cors")  
const channelRoutes = require('../backend/routes/channels')
const usersRoutes = require('../backend/routes/users');
const messageRoutes = require('./routes/message');
const { send } = require('process');

const app = express();
const server = http.createServer(app);
const io = socketIo(server,{
   cors:{
      origin: "*", // Разрешить соединения со всех доменов (лучше заменить на конкретные)
      methods: ["GET", "POST"]
   }
});
 
app.use(express.json());
app.use(cors());

app.use('/channels', channelRoutes);
app.use('/users', usersRoutes);
app.use('/message', messageRoutes);

app.set('io', io); // Делаем io доступным во всех маршрутах

io.on('connection', (socket) => {
   //console.log('Пользователь подключен:', socket.id);

   socket.on('join_channel', (channelId) => {
      socket.join(`channel_${channelId}`);
      //console.log(`Пользователь присоединился к каналу ${channelId}`);
   });

   socket.on('disconnect', () => {
     // console.log('Пользователь отключился:', socket.id);
   });
});


const PORT = 5000;
server.listen(PORT, () => {
   console.log(`Server is starting on port: ${PORT}`)
})
