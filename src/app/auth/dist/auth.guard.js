"use strict";
exports.__esModule = true;
exports.AuthGuard = void 0;
var core_1 = require("@angular/core");
core_1.Injectable({
    providedIn: 'root'
});
exports.AuthGuard = function (route, state) {
    return true;
};
