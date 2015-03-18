module.exports = function(io){

  var allConnections = {
    data: [],
    addToRoom: function(data){
      if(!data.room) return;
      if(!data.socketID) return;

      var roomData = []
      if(this.data[data.room] != undefined){
        roomData = this.data[data.room]
      }

      for(var i = roomData.length - 1; i >= 0; i--){
        if(data.user.username && roomData[i].user.username == data.user.username){
          roomData.splice(i, 1);
        }
        // add something here about same socket id
      }

      roomData.push({socketID: data.socketID, user: data.user});

      this.data[data.room] = roomData;
    },
    removeFromRoom: function(data){
      if(!data.room) return;
      if(!data.socketID) return;

      var roomData = [];
      if(this.data[data.room] != undefined){
        roomData = this.data[data.room]
      }

      for(var i = 0; i < roomData.length; i++){
        if(roomData[i].socketID == data.socketID){
          roomData.splice(i, 1);
        }
      }

      this.data[data.room] = roomData;

      if(roomData.length == 0) delete(this.data[data.room]);
    },
    getRoom: function(room){
      return this.data[room];
    },
    clearAll: function(){
      this.data = [];
    },
    printData: function(){
      return JSON.stringify(this.data);
    }
  }

  io.on('connection', function(socket){
    
    // join room initially
    socket.on('room', function(data){
      if(!data.room) return;

      socket.join(data.room);

      data.socketID = socket.id;

      // add person to room
      allConnections.addToRoom(data);

      // sent all room data to a user who just joined the room
      socket.emit('chatPeople', allConnections.getRoom(data.room));

      // broadcast the user who just joined the room
      socket.broadcast.to(data.room).emit('chatJoined', data);

    });

    // someone left the chat room
    socket.on('disconnect', function(){
      for(var i=0; i<socket.rooms.length; i++){
        var roomID = socket.rooms[i];
        
        // run remove from room
        allConnections.removeFromRoom({room: roomID, socketID: socket.id})

        // broadcast to all rooms that a member has left
        socket.broadcast.to(roomID).emit('chatLeft', socket.id);
      }
      
    });

    // chat room
    socket.on('chat', function(data){
    	if(!data.room) return;

      data.socketID = socket.id;
      socket.broadcast.to(data.room).emit('chatSent', data);
    });

    /* ***************************************************************************** */

  });

};