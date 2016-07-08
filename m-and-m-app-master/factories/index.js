'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var UserFactory = require('../factories/user-factory'),
    TokenFactory = require('../factories/token-factory'),
    MessageFactory = require('../factories/message-factory'),
    SocketFactory = require('../factories/socket-factory');

var user_schema = require('../models/user'),
    token_schema = require('../models/token'),
    message_schema = require('../models/message'),
    socket_schema = require('../models/socket');

module.exports = {
    user_factory: new UserFactory(mongoose, user_schema),
    token_factory: new TokenFactory(mongoose, token_schema),
    message_factory: new MessageFactory(mongoose, message_schema),
    socket_factory: new SocketFactory(mongoose, socket_schema)
};