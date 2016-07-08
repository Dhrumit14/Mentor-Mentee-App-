'use strict';

function UserFactory (mongoose, schema) {
    
    this.model = mongoose.model('User', schema);

    /**
     * Create instance of user model
     */
    this.create_instance = function (schema) {
        return new this.model(schema);
    };

    /**
     * Create user model
     */
    this.create_model = function () {
        return this.model;        
    };
}

module.exports = UserFactory;