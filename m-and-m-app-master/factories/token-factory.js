'use strict';

function TokenFactory (mongoose, schema) {

    this.model = mongoose.model('Token', schema);

    /**
     * Create instance of token model
     */
    this.create_instance = function (schema) {
        return new this.model(schema);
    };

    /**
     * Create token model
     */
    this.create_model = function () {
        return this.model;
    };
}

module.exports = TokenFactory;
