import { Component } from '@angular/core';
import {
  AbstractControl,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <nav>
      <div class="container">
        <h1>Login</h1>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <!-- Email -->
          <div class="inputs">
            <label class="labels">Email</label><br />
            <input
              type="email"
              placeholder="Enter your Email"
              formControlName="email"
            />
            <div
              *ngIf="
                loginForm.get('email')?.invalid &&
                (loginForm.get('email')?.touched || submitted)
              "
            >
              <small *ngIf="loginForm.get('email')?.errors?.['required']"
                >Email is required.</small
              >
              <small *ngIf="loginForm.get('email')?.errors?.['email']"
                >Invalid email format.</small
              >
            </div>
          </div>
          <!-- Password -->
          <div class="inputs">
            <label class="labels">Password</label><br />
            <input
              type="password"
              placeholder="Enter your Password"
              formControlName="password"
            />
            <div
              *ngIf="
                loginForm.get('password')?.invalid &&
                (loginForm.get('password')?.touched || submitted)
              "
            >
              <small *ngIf="loginForm.get('password')?.errors?.['required']"
                >Password is required.</small
              >
              <small *ngIf="loginForm.get('password')?.errors?.['minlength']"
                >Password must be at least 6 characters.</small
              >
            </div>
          </div>
          <!-- Submit -->
          <div class="button">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </nav>
  `,
  styles: ``,
})
export class LoginComponent {
  submitted = false;
  errorMessage = '';
  isLoading = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  constructor(private authService: AuthService, private router: Router) {} // ✅ Injection du service

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;

      this.authService.login({ email: email!, password: password! }).subscribe({
        next: (response) => {
          // Stockage du token (si votre API en retourne un)
          if (response.token) {
            this.authService.setToken(response.token);      
          }
          // Redirection vers la page d'accueil ou dashboard
          this.router.navigate(['/accueil']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage =
            error.error?.message || 'Erreur lors de la connexion';
          console.error('Login error:', error);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }
}
