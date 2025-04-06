// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { AuthService } from '../auth.service';
// import { Observable } from 'rxjs/internal/Observable';
// @Injectable({
//   providedIn: 'root'
// })
// export class TwitteService {
//   private twitteUrl = 'http://localhost:8080/api/twitte';
//   constructor(private http: HttpClient, private authService: AuthService) { }
//   // Récupérer tous les tweets de l'utilisateur connecté
//   getUserTwittes(userId: number): Observable<any[]> {
//     const token = this.authService.getToken();
//     if (!token) {
//       throw new Error('No authentication token found');
//     }
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     });
//     return this.http.get<any[]>(`${this.twitteUrl}/${userId}`, { headers });
//   }
//   // Récupérer les tweets de l'utilisateur connecté
//   getMyTwittes(): Observable<any[]> {
//     const userId = this.authService.getUserId(); // À implémenter dans AuthService
//     return this.getUserTwittes(userId);
//   }
// }
