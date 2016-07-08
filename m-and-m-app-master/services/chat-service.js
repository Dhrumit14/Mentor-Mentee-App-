'use strict';

class ChatService {
    
    constructor (socketFactory, messageFactory) {
        this.sockets = [];
        this.socket_factory = socketFactory;
        this.message_factory = messageFactory;
    }
    
    save_user_socket(id, socket) {
        var self = this;
        
        return remove_all_user_sockets().then(save_socket);
        
        function save_socket() {
            return self.socket_factory.create_instance({
                user_id: id,
                socket_id: socket.id
            }).save().then(() => self.sockets[socket.id] = socket);
        }
        
        function remove_all_user_sockets() {
            return self.socket_factory.create_model().find({user_id: id}).remove().exec();
        }
    }
    
    close_active_socket(id) {
        console.log('remove socket');
        return this.socket_factory.create_model()
            .findOneAndRemove({socket_id: id}).then(() => this.sockets[id] = undefined);
    }
    
    send_message(from, name, to, message) {
        var self = this;
        
        return save_message().then(send_by_socket);
        
        function send_by_socket() {
            return self.socket_factory.create_model()
                .findOne({user_id: to}).then(socket => {
                    console.log('socket: ', socket);

                    if(socket)
                        self.sockets[socket.socket_id].emit('message', name, message);
                    else
                        throw new Error('User don\'t have an active socket');
                });
        }
        
        function save_message() {
            return self.message_factory.create_instance({from: from, name: name, to: to, message: message}).save();
        }
    }
    
    get_last_messages(from, to) {
        return this.message_factory.create_model().find({$or: [{from: from, to: to}, {from: to, to: from}]}).sort('-datetime').limit(20);
    }
}

module.exports = ChatService;