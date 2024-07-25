import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) {}

  register(username: string, password: string) {
    return this.http.post(`/register`, { username, password });
  }

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(`/login`, { username, password });
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    if(localStorage){
        const token = localStorage.getItem(this.tokenKey);
        return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }
  loggedInUserId(){
    let userId='';
    if(localStorage){
      const token = localStorage.getItem(this.tokenKey);
      const data= this.jwtHelper.decodeToken(token || '');
      if(data && data.userId){
        userId=data.userId;
      }
  }
  return userId;
  }
}
