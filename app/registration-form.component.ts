import {Component, Output, EventEmitter} from 'angular2/core';
import {Http, RequestOptions, HTTP_PROVIDERS, Headers} from 'angular2/http';
import {NgForm} from 'angular2/common';

import {User} from "./models/user";

@Component({
    selector: 'registration-form',
    templateUrl: 'app/templates/registration-form.component.html'
})
export class RegistrationComponent {
    
    public user: User = new User('', '', '', '', '', [], []);
    
    public types = ['mentor', 'mentee'];
    
    private http: Http;
    
    constructor (http: Http) {
        this.http = http;
    }

    public submitted: boolean;
    public submit_error;
    
    onSubmit() {
        this.http.post(sessionStorage.getItem('host') + '/user', JSON.stringify(this.user), new RequestOptions({
            headers: new Headers({'Content-Type': 'Application/Json'})
        })).subscribe(res => {
            this.submitted = true;
            this.submit_error = false;

        }, err => {
            this.submit_error = true;
        });
    }
    
    get submitError() {
        return JSON.stringify(this.submit_error);
    }
    
    get mu() {
        return JSON.stringify(this.user);
    }
    
    set skills(strskills: string) {
        this.user.skills = strskills.split(',');
    }
    
}