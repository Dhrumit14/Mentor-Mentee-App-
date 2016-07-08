import {Component, Input, OnChanges, Output, EventEmitter} from "angular2/core";
import {User} from "./models/user";
import {Http, Headers, RequestOptions} from "angular2/http";

@Component({
    selector: 'user-detail-component',
    templateUrl: 'app/templates/user-detail.component.html'
})
export class UserDetailComponent implements OnChanges {
    
    public skills: string[];
    @Input() user: User;
    @Input() user_id: string;
    
    private http: Http;
    
    constructor(http: Http) {
        this.http = http;
    }
    
    ngOnChanges(changes:{}):any {
        if (this.user) {
            this.skills = this.user.skills;
        }
    }
    
    public outgo_rate: number;
    public rate_submitted: boolean = false;
    
    OnVoite() {
        var headers = new Headers();
        
        headers.append('content-type', 'application/json');
        headers.append('authorization', sessionStorage.getItem('token'));
        
        this.http.post(sessionStorage.getItem('host') + '/user/rate', JSON.stringify({id: this.user._id, rate: this.outgo_rate}), new RequestOptions({
            headers: headers
        })).subscribe(() => {
            this.rate_submitted = true;
            this.onRateUpdated.emit(this.user);
        })
        
    }
    
    get rate() {
        var counted = 0;
        
        if (this.user.rates.length <= 0) return 0;
        
        this.user.rates.forEach((rate) => {
            counted += +rate;
        });
        
        return counted / this.user.rates.length;
    }
    
    @Output() onRateUpdated : EventEmitter<User> = new EventEmitter<User>();
    
}