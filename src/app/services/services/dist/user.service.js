"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var UserService = /** @class */ (function () {
    function UserService(authService, http) {
        this.authService = authService;
        this.http = http;
        this.apiUrl = 'http://localhost:8080/api';
    }
    UserService.prototype.getFreshUserData = function () {
        var tokenData = this.authService.getUserFromToken();
        if (!tokenData)
            throw new Error('Not authenticated');
        return this.http.get(this.apiUrl + "/users/" + tokenData.userId, {
            headers: new http_1.HttpHeaders({
                'Authorization': "Bearer " + this.authService.getToken()
            })
        });
    };
    UserService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
