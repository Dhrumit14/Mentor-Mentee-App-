import {Component} from 'angular2/core';
import {Http, RequestOptions, HTTP_PROVIDERS, Headers} from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

import {LoginFormComponent} from './login-form.component';
import {RegistrationComponent} from "./registration-form.component";

import {UserComponent} from "./user.component";
import {User} from "./models/user";
import {ProfileComponent} from "./profile.component";

export class Hero {
    id: number;
    name: string;
}

@RouteConfig([{
    path: '/user/:type',
    name: 'Users',
    component: UserComponent
}, {
    path: '/profile',
    name: 'Profile',
    component: ProfileComponent
}])

@Component({
    selector: 'my-app',
    viewProviders: [HTTP_PROVIDERS],
    directives: [LoginFormComponent, RegistrationComponent, ROUTER_DIRECTIVES, ProfileComponent],
    providers: [ROUTER_PROVIDERS],
    templateUrl: 'app/templates/app.component.html'
})
export class AppComponent {
    
    private http: Http;
    private options : RequestOptions;
    
    public token: string;
    
    public login_show: boolean;
    public registration_show: boolean;
    
    public mentee_show: boolean;
    public mentor_show: boolean;
    
    
    public selected_user: User;
    
    public current_user: User;
    
    onAuthorized(token: string) {
        console.log('onAuthorized');
        this.token = token;
        
        sessionStorage.setItem('token', token);
        this.current_user = JSON.parse(sessionStorage.getItem('user'));
        console.log(sessionStorage.getItem('user'));
        
        this.login_show = false;
        this.registration_show = false;
        
        
        if (this.current_user.type === 'mentor') {
            this.mentee_show = true;
            this.mentor_show = false;
        } else {
            this.mentee_show = false;
            this.mentor_show = true;
        }
    }
    
    onShowLogin() {
        this.login_show = true;
        this.registration_show = false;
    }
    
    onShowRegistration() {
        this.login_show = false;
        this.registration_show = true;
    }
    
    onUserSelected(user: User) {
        this.selected_user = user;
    }
    
    get sessionToken() {return sessionStorage.getItem('token')}
    
    constructor (http: Http) {
        this.current_user = JSON.parse(sessionStorage.getItem('user'));
        
        var headers = new Headers({'Content-Type':'Application/JSON'});
        
        sessionStorage.setItem('host', 'http://localhost:3000');
        
        this.options = new RequestOptions({
            headers: headers
        });
        
        this.http = http;
    }
    
    logout() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        
        this.token = undefined;
        this.current_user = null;
        
        this.onShowLogin();
    }
    
    update_token(token) {
        this.options.headers.delete('Authorization');
        this.options.headers.append('Authorization', token);
    }

    title = 'Tour of Heroes';
    hero: Hero = {
        id: 1,
        name: 'Windstorm'
    };
}