'use strict';

var user_factory = require('../factories').user_factory;
var token_factory = require('../factories').token_factory;
var socket_factory = require('../factories').socket_factory;
var message_factory = require('../factories').message_factory;

var RegistrationService = require('./registration-service');
var ChatService = require('./chat-service');
var UserService = require('./user-service');

module.exports = {
    registration_service : new RegistrationService(user_factory, token_factory),
    chat_service: new ChatService(socket_factory, message_factory),
    user_service: new UserService(user_factory)
};