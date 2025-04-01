"use strict";
exports.__esModule = true;
exports.AuthGuard = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var core_2 = require("@angular/core");
core_1.Injectable({
    providedIn: 'root'
});
exports.AuthGuard = function (route, state) {
    var router = core_2.inject(router_1.Router);
    var token = sessionStorage.getItem('token');
    if (token) {
        return true; // ✅ Accès autorisé
    }
    else {
        router.navigate(['/login']); // 🔴 Redirection si non authentifié
        return false;
    }
};
