import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface UserProfile {
  id: number;
  email: string;
  name?: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private authService: AuthService, private http: HttpClient,) { }

  getFreshUserData(): Observable<UserProfile> {
    const tokenData = this.authService.getUserFromToken();
    if (!tokenData) throw new Error('Not authenticated');

    return this.http.get<UserProfile>(`${this.apiUrl}/users/${tokenData.userId}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    })
  }
}
