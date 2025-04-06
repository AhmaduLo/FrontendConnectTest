"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.AuthService = void 0;
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var AuthService = /** @class */ (function () {
    //HttpClient permet d'envoyer des requêtes HTTP.
    function AuthService(platformId, http, router) {
        this.platformId = platformId;
        this.http = http;
        this.router = router;
        this.apiUrl = 'http://localhost:8080/api';
        //private encryptionKey = 'Bamba'; // Doit matcher avec le backend
        this.loginUrl = this.apiUrl + "/users/login"; // Endpoint spécifique pour le login
        this.registerUrl = this.apiUrl + "/users"; // Endpoint pour l'enregistrement
    }
    // Méthode pour l'inscription
    //register() envoie une requête POST avec les données d'inscription.
    AuthService.prototype.register = function (userData) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post(this.registerUrl, userData, { headers: headers });
    };
    // Méthode pour la connexion
    AuthService.prototype.login = function (credentials) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json'
        });
        //Affichez la requête avant l'envoi
        // console.log("Requête API :", {
        //   url: this.loginUrl,
        //   body: credentials,
        //   headers: headers,
        // });
        return this.http.post(this.loginUrl, credentials, { headers: headers, withCredentials: true }); //withCredentials: true // Pour les cookies de session
    };
    // Méthode pour stocker le token (optionnel)
    AuthService.prototype.setToken = function (token) {
        // Option 1 : SessionStorage (effacé à la fermeture du navigateur)
        sessionStorage.setItem('auth_token', token);
    };
    // Méthode pour récupérer le token (optionnel)
    AuthService.prototype.getToken = function () {
        if (common_1.isPlatformBrowser(this.platformId)) {
            return sessionStorage.getItem('auth_token');
        }
        return null;
    };
    // Vérifie si l'utilisateur est connecté
    AuthService.prototype.isLoggedIn = function () {
        return !!this.getToken(); // Renvoie true si un token est stocké
    };
    // Suppression du token (nouvelle méthode utile pour le logout)
    AuthService.prototype.removeToken = function () {
        sessionStorage.removeItem('auth_token');
        this.router.navigate(['/login']);
    };
    // Méthode pour se déconnecter
    AuthService.prototype.logout = function () {
        this.removeToken();
    };
    // Vérification de l'expiration du token (optionnel)
    AuthService.prototype.isTokenExpired = function () {
        var token = this.getToken();
        if (!token)
            return true;
        var payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000 < Date.now();
    };
    //les données qui sont toujours à jour dans le token
    AuthService.prototype.getUserFromToken = function () {
        var token = this.getToken();
        if (!token)
            return null;
        try {
            var payload = token.split('.')[1];
            var decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
            var _a = JSON.parse(decoded), sub = _a.sub, userId = _a.userId, role = _a.role;
            return { userId: userId, email: sub, role: role };
        }
        catch (error) {
            console.error('Token decoding error', error);
            return null;
        }
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __param(0, core_1.Inject(core_1.PLATFORM_ID))
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
