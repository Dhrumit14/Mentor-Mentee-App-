"use strict";

class SocketServer {

    constructor (http, chatService, registrationService) {
        var self = this;
        this.io = require('socket.io')(http);

        this.io.set('authorization', function (data, callback) {
            console.log('auth:' + data._query.token);
            
            registrationService.get_user(data._query.token).then((user) => {
                if (user) {
                    self.user = user;
                    
                    callback(null, true);
                } else {
                    callback(new Error('Token has expired'), false);
                }
            }).catch(err => {
                callback(err, false);
            });
        });

        this.io.on('connection', (socket) => {
            
            socket.emit('connected');
            
            socket.on('disconnect', () => {
                chatService.close_active_socket(socket.id);
            });
            
            socket.on('message', (token, name, to, message) => {
                console.log('message:', token, name, to, message);
                
                socket.emit('received');
                
                registrationService.get_user(token).then((user) => {
                    chatService.send_message(user._id, name, to, message);
                });
            });
            
            chatService.save_user_socket(self.user._id, socket).then(() => {
                console.log('socket saved: ', self.user._id, socket.id);
            }).catch(err => console.log(err));
        });
    }
    
    get_instance () {
        return this.io;
    }

}

module.exports = SocketServer;