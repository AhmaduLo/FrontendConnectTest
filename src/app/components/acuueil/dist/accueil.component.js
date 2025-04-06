"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AccueilComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var AccueilComponent = /** @class */ (function () {
    function AccueilComponent(authService, userService) {
        this.authService = authService;
        this.userService = userService;
        this.errorMessage = '';
    }
    AccueilComponent.prototype.onLogout = function () {
        this.authService.logout();
    };
    AccueilComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Récupération depuis le token (instantané)
        this.userDataFromToken = this.authService.getUserFromToken();
        // Récupération depuis l'API (données fraîches)
        if (this.userDataFromToken) {
            this.userService.getFreshUserData().subscribe({
                next: function (profile) {
                    _this.userProfile = profile;
                },
                error: function (err) {
                    _this.errorMessage =
                        'Erreur lors du chargement du profil: ' + err.message;
                    console.error(err);
                }
            });
        }
        else {
            this.errorMessage = 'Utilisateur non connecté';
        }
    };
    AccueilComponent = __decorate([
        core_1.Component({
            selector: 'app-accueil',
            imports: [common_1.CommonModule],
            template: "\n    <!-- <div *ngIf=\"userDataFromToken\">\n      <h2>Profil Utilisateur (depuis le token)</h2>\n      <p>ID: {{ userDataFromToken.userId }}</p>\n      <p>Email: {{ userDataFromToken.email }}</p>\n      <p>Role: {{ userDataFromToken.role || 'Non sp\u00E9cifi\u00E9' }}</p>\n    </div> -->\n\n    <div *ngIf=\"userProfile\">\n      <h2>Profil Complet (depuis l'API)</h2>\n      <p>ID: {{ userProfile.id }}</p>\n      <p>Email: {{ userProfile.email }}</p>\n      <p>Nom: {{ userProfile.name || 'Non sp\u00E9cifi\u00E9' }}</p>\n      <p>Role: {{ userProfile.role || 'Non sp\u00E9cifi\u00E9' }}</p>\n    </div>\n\n    <div *ngIf=\"errorMessage\" class=\"error\">\n      {{ errorMessage }}\n    </div>\n\n    <button type=\"button\" (click)=\"onLogout()\">D\u00E9connexion</button>\n  ",
            styleUrl: './accueil.component.scss'
        })
    ], AccueilComponent);
    return AccueilComponent;
}());
exports.AccueilComponent = AccueilComponent;
