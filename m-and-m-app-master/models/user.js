'use strict';

var ObjectId = require('mongoose').Schema.Types.ObjectId;

module.exports = {
    type: String,
    
    username: String,
    password: String,
    
    name: String,
    email: String,
    skills: Array,
    rates: Array
};