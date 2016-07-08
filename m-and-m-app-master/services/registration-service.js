'use strict';

var rand_token = require('rand-token');

class RegistrationService {
    
    constructor(userFactory, tokenFactory) {
        this.user_factory = userFactory;
        this.token_factory = tokenFactory;
    }

    /**
     * New user registration
     * 
     * @param {Object} schema
     */
    register_new_user(schema) {
        return this.user_factory.create_model().findOne({email: schema.email, $or: [{username: schema.username}]}).then(user => {
            if(user)
                return Promise.reject(new Error('Wrong username or email'));
            else
                return this.user_factory.create_instance(schema).save();
        });
    }

    /**
     * Authentificate middleware function
     * 
     * @param req
     * @param res
     * @param next
     */
    authentificate(req, res, next) {
        var token = req.get('Authorization') || req.get('authorization');
        
        if (token)
            this.get_user(token).then(user => {
                if (user) {
                    req.user = user;

                    next();
                } else {
                    res.sendStatus(403);
                }
            }).catch(() => res.sendStatus(403));
        else
            res.sendStatus(403);
    }

    /**
     * Get a new token by user pass pair
     * 
     * @param {String} username
     * @param {String} password
     */
    get_token(username, password) {
        return this.user_factory.create_model()
            .findOne({username: username, password: password}).then(user => {
                if (user) 
                    return this.token_factory
                        .create_instance({
                            user_id: user._id,
                            token: rand_token.generate(32)
                        }).save();
                else
                    throw new Error('Wrong username or password');
            });
    }

    /**
     * Get user by token
     * 
     * @param {String} token
     */
    get_user(token) {
        return this.token_factory.create_model()
            .findOne({token: token}).then(token => {
                if (token)
                    return this.user_factory.create_model().findOne({_id: token.user_id});
                else
                    throw new Error('Token has expired');
            });
    }

    /**
     * Remove token
     * 
     * @param token
     */
    logout(token) {
        return this.token_factory.create_model().findOneAndRemove({token: token});
    }
}

module.exports = RegistrationService;