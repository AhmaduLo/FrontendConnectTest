"use strict";
exports.__esModule = true;
exports.AuthInterceptor = void 0;
exports.AuthInterceptor = function (req, next) {
    // Récupération du token
    var token = sessionStorage.getItem('token');
    // Si le token existe, on clone la requête avec le header Authorization
    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + token
            }
        });
    }
    // Poursuite de la requête
    return next(req);
};
