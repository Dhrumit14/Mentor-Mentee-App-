import {Component, Output, EventEmitter, Input} from 'angular2/core';
import {Http, RequestOptions, HTTP_PROVIDERS, Headers} from 'angular2/http';
import {NgForm} from 'angular2/common';

import {Account} from './models/account';

@Component({
    selector: 'login-form',
    templateUrl: 'app/templates/login-form.component.html'
})
export class LoginFormComponent {
    
    public token: string;
    
    private http: Http;
    
    constructor (http: Http) {
        this.http = http;
    }
    
    @Input()
    submitted = false;
    @Input()
    authorized = false;

    @Output() onAuthorized: EventEmitter<string> = new EventEmitter<string>();

    onSubmit() {
        this.submitted = true;
        
        this.http.post(sessionStorage.getItem('host') + '/authorization', JSON.stringify(this.model), new RequestOptions({
            headers: new Headers({'Content-Type': 'Application/Json'})
        })).subscribe(res => {
            this.token = res.json().token.token;
            sessionStorage.setItem('user', JSON.stringify(res.json().user));
            
            this.authorized = true;
            
            this.onAuthorized.emit(this.token);
            
            this.submitted = false;
            this.authorized = false;
            
        }, () => {
            this.authorized = false;
        });
    }
    
    model = new Account('', '');

    get diagnostic() {return JSON.stringify(this.model)}

}