import {Component, OnInit, Output, EventEmitter} from 'angular2/core';
import {Http, RequestOptions, HTTP_PROVIDERS, Headers} from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteParams} from 'angular2/router';
import {User} from "./models/user";
import {ChatFormComponent} from "./chat-form-component";
import {UserDetailComponent} from "./user-detail.component";
import {Notification} from "rxjs/Notification";


@Component({
    selector: 'user-component',
    templateUrl: 'app/templates/user.component.html',
    directives: [ChatFormComponent, UserDetailComponent]
})
export class UserComponent implements OnInit {
    ngOnInit():any {
        var type = this.route_params.get('type');
        
        (type === 'mentor') ? this.header = "Mentors" : this.header = "Mentees";
        
        this.getUsers(type).subscribe((users) => this.users = users.json());
    }
    
    private http: Http;
    private route_params: RouteParams;
    
    public users: User[];
    public detail_user: User;
    public detail_user_skills;
    
    detailSelect(user: User) {
        if ( this.detail_user && (this.detail_user._id === user._id)) {
            this.detail_user = undefined;
            this.detail_user_skills = undefined;
        } else {
            this.detail_user = user;
            this.detail_user_skills = user.skills;
        }
    }
    
    public skill_filter;
    
    skillSearch() {
        
        var result = [];

        var sskills: Set<string> = new Set<string>(this.skill_filter.split(','));
        var type = this.route_params.get('type');
        
        
        this.getUsers(type).subscribe(users => {
            if (this.skill_filter.length <= 0) {
                this.users = users.json();
                return;
            }
            
            users.json().forEach((user) => {
                var uskills: Set<string> = new Set<string>(user.skills);
                var flag = true;

                sskills.forEach((skill) => {
                    flag = uskills.has(skill);
                });

                if(flag) result.push(user);
            });

            this.users = result;
        });
    }
    
    @Output() onUserSelected : EventEmitter<User> = new EventEmitter<User>();
    public selected_user: User;
    
    public header: string;
    
    public socket;
    
    public notificator: string;
    
    public notifications;
    constructor (http: Http, route: RouteParams) {
        this.http = http;
        this.route_params = route;
        
        this.socket = io.connect(sessionStorage.getItem('host'), {query: "token=" + sessionStorage.getItem('token')});
        
        this.socket.on('message', (from, message) => {
            this.notificator = 'New message from ' + from;

            $("#notification").fadeIn("slow").html('<span class="dismiss"><a title="dismiss this notification">x</a></span>' + 'New message from ' + from);
            $(".dismiss").click(function(){
                $("#notification").fadeOut("slow");
            });
            
            setTimeout(() => {
                this.notificator = "";
            }, 3000);
        });
    }
    
    selectUser(user: User) {
        this.onUserSelected.emit(user);
        this.selected_user = user;
    }
    
    onRateUpdated() {
        this.getUsers(this.route_params.get('type')).subscribe((users) => {
            this.users = users.json();
            this.detail_user = undefined;
        });
    }
    
    getUsers(type: string) {
        var token = sessionStorage.getItem('token');
        
        var headers = new Headers();
        
        headers.append('Content-Type', 'Application/JSON');
        headers.append('Authorization', token);
        
        return this.http.get(sessionStorage.getItem('host') + '/' + type, new RequestOptions({
            headers: headers
        }));
    }
}
