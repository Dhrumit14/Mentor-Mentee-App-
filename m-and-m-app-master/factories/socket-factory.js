'use strict';

function SocketFactory (mongoose, schema) {
    
    this.model = mongoose.model('Socket', schema);

    /**
     * Create instance of socket model
     */
    this.create_instance = function (schema) {
        return new this.model(schema);
    };

    /**
     * Create socket model
     */
    this.create_model = function () {
        return this.model;
    };
}

module.exports = SocketFactory;