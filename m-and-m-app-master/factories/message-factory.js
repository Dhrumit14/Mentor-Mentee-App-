'use strict';

function MessageFactory (mongoose, schema) {

    this.model = mongoose.model('Message', schema);

    /**
     * Create instance of message model
     */
    this.create_instance = function (schema) {
        return new this.model(schema);
    };

    /**
     * Create message model
     */
    this.create_model = function () {
        return this.model;
    };
}

module.exports = MessageFactory;
