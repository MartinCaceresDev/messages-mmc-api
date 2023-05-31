const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server: SocketServer } = require('socket.io');
const usersRouter = require('./routes/usersRouter');
const chatsRouter = require('./routes/chatsRouter');
const { PORT } = require('./port');
const corsOptions = require('./corsOptions');
const { urlFront } = require('./utils/urlFront');
require('dotenv').config()

app.use(cors(corsOptions));

app.use('/api/users', usersRouter);
app.use('/api/chats', chatsRouter);

const server = http.createServer(app);

try {
	mongoose.connect(process.env.DB_CONNECTION);
	console.log('connected to DB');
} catch (err) {
	console.log(err);
}

const io = new SocketServer(server, {
	cors: {
		origin: urlFront.production,
	},
});

io.on('connection', (socket) => {
	socket.on('newUser', (newUser) => {
		socket.broadcast.emit('newUser', newUser);
	});
	socket.on('joinToRooms', (roomsIds)=>{
		for(let id of roomsIds){
			socket.join(id);
		}
	});
	socket.on('leaveRooms', (roomsIds)=>{
		for(let id of roomsIds){
			socket.leave(id);
		}
	});
	socket.on('newMessage', (newMessage) => {
		socket.to(newMessage.room).emit('newMessage', newMessage);
	});
	socket.on('messagesAreSeen', ({ room, allMessages, user })=>{
		socket.to(room).emit('messagesAreSeen', { allMessages, user });
	})
	socket.on('leave_room', (room)=>{
		socket.leave(room);
	})
});

server.listen(PORT, () => {
	console.log('Server listening on port 3500');
});
