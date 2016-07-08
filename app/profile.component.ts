import {Component} from "angular2/core";
import {Http, RequestOptions, Headers} from "angular2/http";
import {User} from "./models/user";

@Component({
    selector: 'profile-component',
    templateUrl: 'app/templates/profile.component.html'
})
export class ProfileComponent {
    private http: Http;
    public current_user: User;
    
    constructor (http: Http) {
        this.http = http;
        
        this.current_user = JSON.parse(sessionStorage.getItem('user'));
    }
    
    public profile_submitted: boolean = false;
    
    onUpdateProfile() {
        var headers = new Headers();
        
        headers.append('Content-Type', 'Application/Json');
        headers.append('Authorization', sessionStorage.getItem('token'));
        
        this.http.put(sessionStorage.getItem('host') + '/user', JSON.stringify(this.current_user), new RequestOptions({
            headers: headers
        })).subscribe(() => {
            sessionStorage.setItem('user', JSON.stringify(this.current_user));
            this.profile_submitted = true;
        })
    }
    
    public get get_skills() {
        var result: string = '';
        
        for(var i = 0; i < this.current_user.skills.length - 1; i ++) {
            result += this.current_user.skills[i] + ',';
        }
        result += this.current_user.skills[i];
        
        return result;
    }
    
    public set skills(raw) {
        this.current_user.skills = raw.split(',');
    }
}