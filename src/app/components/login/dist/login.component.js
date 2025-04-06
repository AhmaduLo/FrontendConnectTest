"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var common_1 = require("@angular/common");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.submitted = false;
        this.errorMessage = '';
        this.isLoading = false;
        this.loginForm = new forms_2.FormGroup({
            email: new forms_2.FormControl('', [forms_2.Validators.required, forms_2.Validators.email]),
            password: new forms_2.FormControl('', [
                forms_2.Validators.required,
                forms_2.Validators.minLength(6),
            ])
        });
    } // ✅ Injection du service
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        this.errorMessage = '';
        if (this.loginForm.valid) {
            this.isLoading = true;
            var _a = this.loginForm.value, email = _a.email, password = _a.password;
            this.authService.login({ email: email, password: password }).subscribe({
                next: function (response) {
                    // Stockage du token (si votre API en retourne un)
                    if (response.token) {
                        _this.authService.setToken(response.token);
                    }
                    // Redirection vers la page d'accueil ou dashboard
                    _this.router.navigate(['/accueil']);
                },
                error: function (error) {
                    var _a;
                    _this.isLoading = false;
                    _this.errorMessage =
                        ((_a = error.error) === null || _a === void 0 ? void 0 : _a.message) || 'Erreur lors de la connexion';
                    console.error('Login error:', error);
                },
                complete: function () {
                    _this.isLoading = false;
                }
            });
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            imports: [forms_1.ReactiveFormsModule, common_1.CommonModule],
            template: "\n    <nav>\n      <div class=\"container\">\n        <h1>Login</h1>\n        <form [formGroup]=\"loginForm\" (ngSubmit)=\"onSubmit()\">\n          <!-- Email -->\n          <div class=\"inputs\">\n            <label class=\"labels\">Email</label><br />\n            <input\n              type=\"email\"\n              placeholder=\"Enter your Email\"\n              formControlName=\"email\"\n            />\n            <div\n              *ngIf=\"\n                loginForm.get('email')?.invalid &&\n                (loginForm.get('email')?.touched || submitted)\n              \"\n            >\n              <small *ngIf=\"loginForm.get('email')?.errors?.['required']\"\n                >Email is required.</small\n              >\n              <small *ngIf=\"loginForm.get('email')?.errors?.['email']\"\n                >Invalid email format.</small\n              >\n            </div>\n          </div>\n          <!-- Password -->\n          <div class=\"inputs\">\n            <label class=\"labels\">Password</label><br />\n            <input\n              type=\"password\"\n              placeholder=\"Enter your Password\"\n              formControlName=\"password\"\n            />\n            <div\n              *ngIf=\"\n                loginForm.get('password')?.invalid &&\n                (loginForm.get('password')?.touched || submitted)\n              \"\n            >\n              <small *ngIf=\"loginForm.get('password')?.errors?.['required']\"\n                >Password is required.</small\n              >\n              <small *ngIf=\"loginForm.get('password')?.errors?.['minlength']\"\n                >Password must be at least 6 characters.</small\n              >\n            </div>\n          </div>\n          <!-- Submit -->\n          <div class=\"button\">\n            <button type=\"submit\">Login</button>\n          </div>\n        </form>\n      </div>\n    </nav>\n  ",
            styles: ""
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
