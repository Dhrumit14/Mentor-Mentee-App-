'use strict';

var ObjectId = require('mongoose').Schema.Types.ObjectId;

module.exports = {
    user_id: ObjectId,
    
    token: String
};
