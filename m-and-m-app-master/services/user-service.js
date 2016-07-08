"use strict";

class UserService {
    
    constructor (userFactory) {
        this.user_factory = userFactory;
    }

    get_mentors() {
        return this.user_factory.create_model().find({type: 'mentor'});
    }
    
    get_mentees() {
        return this.user_factory.create_model().find({type: 'mentee'});
    }
    
    get_user(id) {
        return this.user_factory.create_model().findOne({_id: id});
    }

    set_rate(id, rate) {
        return this.user_factory.create_model().findOne({_id: id}).then((user) => {
            user.rates.push(rate);
            
            return this.user_factory.create_model().findOneAndUpdate({_id: id}, {$set: {rates: user.rates}});
        })
    }

    update_user(id, fields) {
        return this.user_factory.create_model().findOneAndUpdate({_id: id}, {$set: {skills: fields.skills, name: fields.name, email: fields.email}})
    }
}

module.exports = UserService;