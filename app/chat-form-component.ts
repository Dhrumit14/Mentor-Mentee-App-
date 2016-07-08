import {Component, Input, OnChanges, SimpleChange, OnInit} from 'angular2/core';

import {Message} from './models/message';
import {Http, RequestOptions, Headers} from "angular2/http";

@Component({
    selector: 'chat-form',
    templateUrl: 'app/templates/chat-form.component.html'
})
export class ChatFormComponent implements OnInit, OnChanges {
    ngOnChanges(changes:{}):any {
        this.getChatMessages();
    }
    
    ngOnInit():any {
        this.token = sessionStorage.getItem('token');
        
        //this.socket = io.connect(sessionStorage.getItem('host'), {query: "token=" + this.token});
        
        this.getChatMessages();

        this.socket.on('connected', () => {
            this.connected = true;
        });

        this.socket.on('message', (from, message) => {
            this.getChatMessages();
            //this.messages.push(new Message(from, message));
        });
        
        this.socket.on('received', () => this.getChatMessages());
    }

    @Input()
    public token: string;
    
    @Input()
    public socket;
    
    @Input()
    public receiver_id: string;
    
    public connected = false;
    public messages: Message[] = [];
    public outgo_message: string;
    
    private http: Http;
    
    constructor (http: Http) {
        this.http = http;
    }
    
    OnSend() {
        //this.messages.push(new Message('Me', this.outgo_message));
        this.socket.emit('message', this.token, JSON.parse(sessionStorage.getItem('user')).name, this.receiver_id, this.outgo_message);
    }
    
    getChatMessages() {
        var token = sessionStorage.getItem('token');

        var headers = new Headers();

        headers.append('Content-Type', 'Application/JSON');
        headers.append('Authorization', token);
        
        this.http.get(sessionStorage.getItem('host') + '/messages/' + this.receiver_id, new RequestOptions({
            headers: headers
        })).subscribe(messages => this.messages = messages.json().reverse());
    }
}
