import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';
  //private encryptionKey = 'Bamba'; // Doit matcher avec le backend
  private loginUrl = `${this.apiUrl}/users/login`; // Endpoint spécifique pour le login
  private registerUrl = `${this.apiUrl}/users`; // Endpoint pour l'enregistrement

  //HttpClient permet d'envoyer des requêtes HTTP.
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private router: Router) { }

  // Méthode pour l'inscription
  //register() envoie une requête POST avec les données d'inscription.
  register(userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(this.registerUrl, userData, { headers });
  }

  // Méthode pour la connexion
  login(credentials: { email: string, password: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    //Affichez la requête avant l'envoi
    // console.log("Requête API :", {
    //   url: this.loginUrl,
    //   body: credentials,
    //   headers: headers,

    // });
    return this.http.post(this.loginUrl, credentials, { headers, withCredentials: true }) //withCredentials: true // Pour les cookies de session
  }

  // Méthode pour stocker le token (optionnel)
  setToken(token: string): void {
    // Option 1 : SessionStorage (effacé à la fermeture du navigateur)
    sessionStorage.setItem('auth_token', token);
  }

  // Méthode pour récupérer le token (optionnel)
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem('auth_token');
    }
    return null;
  }

  // Vérifie si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!this.getToken(); // Renvoie true si un token est stocké
  }
  // Suppression du token (nouvelle méthode utile pour le logout)
  removeToken(): void {
    sessionStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }
  // Méthode pour se déconnecter
  logout(): void {
    this.removeToken();
  }

  // Vérification de l'expiration du token (optionnel)
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  }

  //les données qui sont toujours à jour dans le token
  getUserFromToken(): { userId: number, email: string, role?: string } | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      const { sub, userId, role } = JSON.parse(decoded);
      return { userId, email: sub, role };
    } catch (error) {
      console.error('Token decoding error', error);
      return null;
    }
  }

  // getUserId(): number {
  //   const tokenData = this.getUserFromToken();
  //   if (!tokenData?.userId) {
  //     throw new Error('User ID not found in token');
  //   }
  //   return tokenData.userId;
  // }
}
