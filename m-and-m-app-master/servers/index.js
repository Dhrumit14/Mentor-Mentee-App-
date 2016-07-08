"use strict";

var services = require('../services');

var APIServer = require('./api-server');
var SocketServer = require('./socket-server');


var api_server = new APIServer(services.registration_service, services.user_service, services.chat_service);

var http = require('http').Server(api_server.get_instance());
var socket_server = new SocketServer(http, services.chat_service, services.registration_service);

module.exports = {
    api_server: api_server,
    socket_server: socket_server,
    http: http
};
