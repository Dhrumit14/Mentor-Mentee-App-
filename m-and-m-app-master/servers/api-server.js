'use strict';

var EventEmitter = require('events');

class APIServer extends EventEmitter {
    
    constructor(registrationService, userService, chatService) {
        super();

        this.express = require('express');
        this.app = this.express();
        
        this.app.all('/*', function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
            res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization, Origin, Accept, 0, 1');
            
            next();
        });
        
        var authentification = registrationService.authentificate.bind(registrationService);

        this.app.use(require('body-parser').json());

        this.app.post('/user', (req, res) => {
            if (!req.body.name ||
                !req.body.username ||
                !req.body.password ||
                !req.body.type ||
                !req.body.email ||
                !(req.body.skills instanceof Array)
            ) return res.sendStatus(400);

            registrationService.register_new_user(req.body)
                .then(() => res.sendStatus(200)).catch(err => res.sendStatus(400));
        });

        this.app.get('/user/:id', authentification, (req, res) => {
            return userService.get_user(req.params.id).then(mentors => res.send(mentors)).catch(err => res.send(err));
        });
        
        this.app.post('/authorization', (req, res) => {
            if (!req.body.username || !req.body.password)
                return res.sendStatus(400);
            
            registrationService.get_token(req.body.username, req.body.password)
                .then(token => {
                    registrationService.get_user(token.token).then((user) => {
                        res.send({user: user, token: token});
                    }).catch(err => res.sendStatus(403));
                }).catch(err => res.sendStatus(403));
        });
        
        this.app.get('/mentor', authentification, (req, res) => {
            return userService.get_mentors().then(mentors => res.send(mentors)).catch(err => res.send(err));
        });
        
        this.app.get('/mentee', authentification, (req, res) => {
            return userService.get_mentees().then(mentees => res.send(mentees)).catch(err => res.send(err));
        });
        
        this.app.get('/messages/:user_id', authentification, (req, res) => {
            return chatService.get_last_messages(req.params.user_id, req.user._id).then(messages => res.send(messages))
                .catch(err => res.send(err));
        });
        
        this.app.post('/user/rate', authentification, (req, res) => {
            if(!req.body.rate || !req.body.id) return res.sendStatus(400);
            
            return userService.set_rate(req.body.id, req.body.rate).then(() => res.sendStatus(200)).catch(err => res.send(err));
        });
        
        this.app.put('/user', authentification, (req, res) => {
            if(!req.body._id || !req.body.skills || !req.body.name || !req.body.email) return res.sendStatus(400);
            
            return userService.update_user(req.body._id, {
                skills: req.body.skills,
                name: req.body.name,
                email: req.body.email
            }).then(() => res.sendStatus(200)).catch((err) => res.send(err));
        });
        
    }
    
    get_instance() {
        return this.app;
    }

}

module.exports = APIServer;