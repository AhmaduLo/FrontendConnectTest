import { Component } from '@angular/core';
import { AbstractControl, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="container">
      <h1>Signup</h1>

      <form (ngSubmit)="valider()" [formGroup]="submitForm">
    <!-- Name -->
    <div class="inputs">
      <label class="labels">Name</label><br />
      <input type="text" placeholder="Enter your Name" formControlName="name" />
      <div *ngIf="submitForm.get('name')?.invalid && submitForm.get('name')?.touched">
        <small *ngIf="submitForm.get('name')?.errors?.['required']">Name is required.</small>
        <small *ngIf="submitForm.get('name')?.errors?.['minlength']">Name must be at least 3 characters.</small>
      </div>
    </div>

    <!-- Email -->
    <div class="inputs">
      <label class="labels">Email</label><br />
      <input type="email" placeholder="Enter your Email" formControlName="email" />
      <div *ngIf="submitForm.get('email')?.invalid && submitForm.get('email')?.touched">
        <small *ngIf="submitForm.get('email')?.errors?.['required']">Email is required.</small>
        <small *ngIf="submitForm.get('email')?.errors?.['email']">Invalid email format.</small>
      </div>
    </div>

    <!-- Password -->
    <div class="inputs">
      <label class="labels">Password</label><br />
      <input type="password" placeholder="Enter your Password" formControlName="password" />
      <div *ngIf="submitForm.get('password')?.invalid && submitForm.get('password')?.touched">
        <small *ngIf="submitForm.get('password')?.errors?.['required']">Password is required.</small>
        <small *ngIf="submitForm.get('password')?.errors?.['minlength']">Password must be at least 6 characters.</small>
      </div>
    </div>

    <!-- Password Confirmation -->
    <div class="inputs">
      <label class="labels">Password Confirmation</label><br />
      <input type="password" placeholder="Confirm your Password" formControlName="passwordconfirmation" />
      <div *ngIf="submitForm.hasError('passwordsMismatch') && submitForm.touched">
        <small>Passwords do not match.</small>
      </div>
    </div>

    <!-- Submit -->
    <div class="button">
      <input type="submit" value="SignUp"  [disabled]="submitForm.invalid || submitForm.hasError('passwordsMismatch')" />
    </div>
  </form>
    </div>
  `,
  styles: ``,
})
export class SignupComponent {
  submitForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    passwordconfirmation: new FormControl('', Validators.required),
  }, { validators: this.passwordsMatchValidator });

  //Fonction de validation personnalisée pour vérifier si les mots de passe sont identiques
  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const passwordconfirmation = control.get('passwordconfirmation')?.value;
    return password === passwordconfirmation ? null : { passwordsMismatch: true };
  }

  constructor(private authService: AuthService) { } // ✅ Injection du service

  valider() {
    if (this.submitForm.valid) {
      const userData = this.submitForm.value;
      // Envoi de la requête POST au backend
      this.authService.register(userData).subscribe({
        next: (response) => {
          console.log('Inscription reussi', response);
        },
        error: (error) => {
          console.error('Erreur lors de l’inscription', error);
        }
      })
    }
  }

}
