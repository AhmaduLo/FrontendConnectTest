import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accueil',
  imports: [CommonModule],

  template: `
    <!-- <div *ngIf="userDataFromToken">
      <h2>Profil Utilisateur (depuis le token)</h2>
      <p>ID: {{ userDataFromToken.userId }}</p>
      <p>Email: {{ userDataFromToken.email }}</p>
      <p>Role: {{ userDataFromToken.role || 'Non spécifié' }}</p>
    </div> -->

    <div *ngIf="userProfile">
      <h2>Profil Complet (depuis l'API)</h2>
      <p>ID: {{ userProfile.id }}</p>
      <p>Email: {{ userProfile.email }}</p>
      <p>Nom: {{ userProfile.name || 'Non spécifié' }}</p>
      <p>Role: {{ userProfile.role || 'Non spécifié' }}</p>
    </div>

    <div *ngIf="errorMessage" class="error">
      {{ errorMessage }}
    </div>

    <button type="button" (click)="onLogout()">Déconnexion</button>
  `,
  styleUrl: './accueil.component.scss',
})
export class AccueilComponent {
  userDataFromToken: any;
  userProfile: any;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    //private twitteService: TwitteService
  ) {}

  onLogout(): void {
    this.authService.logout();
  }

  ngOnInit(): void {
    // Récupération depuis le token (instantané)
    this.userDataFromToken = this.authService.getUserFromToken();

    // Récupération depuis l'API (données fraîches)
    if (this.userDataFromToken) {
      this.userService.getFreshUserData().subscribe({
        next: (profile) => {
          this.userProfile = profile;
        },
        error: (err) => {
          this.errorMessage =
            'Erreur lors du chargement du profil: ' + err.message;
          console.error(err);
        },
      });
    } else {
      this.errorMessage = 'Utilisateur non connecté';
    }
  }
}
