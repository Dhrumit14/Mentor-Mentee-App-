System.register(['angular2/core', 'angular2/http', 'angular2/router', './login-form.component', "./registration-form.component", "./user.component", "./profile.component"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, router_1, login_form_component_1, registration_form_component_1, user_component_1, profile_component_1;
    var Hero, AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (login_form_component_1_1) {
                login_form_component_1 = login_form_component_1_1;
            },
            function (registration_form_component_1_1) {
                registration_form_component_1 = registration_form_component_1_1;
            },
            function (user_component_1_1) {
                user_component_1 = user_component_1_1;
            },
            function (profile_component_1_1) {
                profile_component_1 = profile_component_1_1;
            }],
        execute: function() {
            Hero = (function () {
                function Hero() {
                }
                return Hero;
            }());
            exports_1("Hero", Hero);
            AppComponent = (function () {
                function AppComponent(http) {
                    this.title = 'Tour of Heroes';
                    this.hero = {
                        id: 1,
                        name: 'Windstorm'
                    };
                    this.current_user = JSON.parse(sessionStorage.getItem('user'));
                    var headers = new http_1.Headers({ 'Content-Type': 'Application/JSON' });
                    sessionStorage.setItem('host', 'http://78.139.126.171:3000');
                    this.options = new http_1.RequestOptions({
                        headers: headers
                    });
                    this.http = http;
                }
                AppComponent.prototype.onAuthorized = function (token) {
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
                    }
                    else {
                        this.mentee_show = false;
                        this.mentor_show = true;
                    }
                };
                AppComponent.prototype.onShowLogin = function () {
                    this.login_show = true;
                    this.registration_show = false;
                };
                AppComponent.prototype.onShowRegistration = function () {
                    this.login_show = false;
                    this.registration_show = true;
                };
                AppComponent.prototype.onUserSelected = function (user) {
                    this.selected_user = user;
                };
                Object.defineProperty(AppComponent.prototype, "sessionToken", {
                    get: function () { return sessionStorage.getItem('token'); },
                    enumerable: true,
                    configurable: true
                });
                AppComponent.prototype.logout = function () {
                    sessionStorage.removeItem('token');
                    sessionStorage.removeItem('user');
                    this.token = undefined;
                    this.current_user = null;
                    this.onShowLogin();
                };
                AppComponent.prototype.update_token = function (token) {
                    this.options.headers.delete('Authorization');
                    this.options.headers.append('Authorization', token);
                };
                AppComponent = __decorate([
                    router_1.RouteConfig([{
                            path: '/user/:type',
                            name: 'Users',
                            component: user_component_1.UserComponent
                        }, {
                            path: '/profile',
                            name: 'Profile',
                            component: profile_component_1.ProfileComponent
                        }]),
                    core_1.Component({
                        selector: 'my-app',
                        viewProviders: [http_1.HTTP_PROVIDERS],
                        directives: [login_form_component_1.LoginFormComponent, registration_form_component_1.RegistrationComponent, router_1.ROUTER_DIRECTIVES, profile_component_1.ProfileComponent],
                        providers: [router_1.ROUTER_PROVIDERS],
                        templateUrl: 'app/templates/app.component.html'
                    }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map