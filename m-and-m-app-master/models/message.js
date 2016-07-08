'use strict';

var ObjectId = require('mongoose').Schema.Types.ObjectId;

module.exports = {
    from: ObjectId,
    name: String,
    to: ObjectId,
    message: String,
    datetime: { type: Date, default: Date.now }
};
