"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SignupComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var common_1 = require("@angular/common");
var SignupComponent = /** @class */ (function () {
    function SignupComponent(authService) {
        this.authService = authService;
        this.submitForm = new forms_2.FormGroup({
            name: new forms_2.FormControl('', [forms_2.Validators.required, forms_2.Validators.minLength(5)]),
            email: new forms_2.FormControl('', [forms_2.Validators.required, forms_2.Validators.email]),
            password: new forms_2.FormControl('', forms_2.Validators.required),
            passwordconfirmation: new forms_2.FormControl('', forms_2.Validators.required)
        }, { validators: this.passwordsMatchValidator });
    } // ✅ Injection du service
    //Fonction de validation personnalisée pour vérifier si les mots de passe sont identiques
    SignupComponent.prototype.passwordsMatchValidator = function (control) {
        var _a, _b;
        var password = (_a = control.get('password')) === null || _a === void 0 ? void 0 : _a.value;
        var passwordconfirmation = (_b = control.get('passwordconfirmation')) === null || _b === void 0 ? void 0 : _b.value;
        return password === passwordconfirmation ? null : { passwordsMismatch: true };
    };
    SignupComponent.prototype.valider = function () {
        if (this.submitForm.valid) {
            var userData = this.submitForm.value;
            // Envoi de la requête POST au backend
            this.authService.register(userData).subscribe({
                next: function (response) {
                    console.log('Inscription reussi', response);
                },
                error: function (error) {
                    console.error('Erreur lors de l’inscription', error);
                }
            });
        }
    };
    SignupComponent = __decorate([
        core_1.Component({
            selector: 'app-signup',
            imports: [forms_1.ReactiveFormsModule, common_1.CommonModule],
            template: "\n    <div class=\"container\">\n      <h1>Signup</h1>\n\n      <form (ngSubmit)=\"valider()\" [formGroup]=\"submitForm\">\n    <!-- Name -->\n    <div class=\"inputs\">\n      <label class=\"labels\">Name</label><br />\n      <input type=\"text\" placeholder=\"Enter your Name\" formControlName=\"name\" />\n      <div *ngIf=\"submitForm.get('name')?.invalid && submitForm.get('name')?.touched\">\n        <small *ngIf=\"submitForm.get('name')?.errors?.['required']\">Name is required.</small>\n        <small *ngIf=\"submitForm.get('name')?.errors?.['minlength']\">Name must be at least 3 characters.</small>\n      </div>\n    </div>\n\n    <!-- Email -->\n    <div class=\"inputs\">\n      <label class=\"labels\">Email</label><br />\n      <input type=\"email\" placeholder=\"Enter your Email\" formControlName=\"email\" />\n      <div *ngIf=\"submitForm.get('email')?.invalid && submitForm.get('email')?.touched\">\n        <small *ngIf=\"submitForm.get('email')?.errors?.['required']\">Email is required.</small>\n        <small *ngIf=\"submitForm.get('email')?.errors?.['email']\">Invalid email format.</small>\n      </div>\n    </div>\n\n    <!-- Password -->\n    <div class=\"inputs\">\n      <label class=\"labels\">Password</label><br />\n      <input type=\"password\" placeholder=\"Enter your Password\" formControlName=\"password\" />\n      <div *ngIf=\"submitForm.get('password')?.invalid && submitForm.get('password')?.touched\">\n        <small *ngIf=\"submitForm.get('password')?.errors?.['required']\">Password is required.</small>\n        <small *ngIf=\"submitForm.get('password')?.errors?.['minlength']\">Password must be at least 6 characters.</small>\n      </div>\n    </div>\n\n    <!-- Password Confirmation -->\n    <div class=\"inputs\">\n      <label class=\"labels\">Password Confirmation</label><br />\n      <input type=\"password\" placeholder=\"Confirm your Password\" formControlName=\"passwordconfirmation\" />\n      <div *ngIf=\"submitForm.hasError('passwordsMismatch') && submitForm.touched\">\n        <small>Passwords do not match.</small>\n      </div>\n    </div>\n\n    <!-- Submit -->\n    <div class=\"button\">\n      <input type=\"submit\" value=\"SignUp\"  [disabled]=\"submitForm.invalid || submitForm.hasError('passwordsMismatch')\" />\n    </div>\n  </form>\n    </div>\n  ",
            styles: ""
        })
    ], SignupComponent);
    return SignupComponent;
}());
exports.SignupComponent = SignupComponent;
