import { iAuthData } from './../models/i-auth-data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { JwtHelperService } from '@auth0/angular-jwt';
import { iAuthResponse } from '../models/i-auth-response';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { iUser } from '../models/i-user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = `${environment.apiUrl}`;
  loginUrl: string = `${this.apiUrl}Auth/login`;
  registerUrl: string = `${this.apiUrl}Auth/register`;

  jwtHelper: JwtHelperService = new JwtHelperService();

  authSubject = new BehaviorSubject<Partial<iUser> | null>(null);
  $user = this.authSubject.asObservable();

  syncIsLoggedIn: boolean = false;

  isLoggedIn$ = this.$user.pipe(
    map((user) => !!user),
    tap((isLoggedIn) => {
      this.syncIsLoggedIn = isLoggedIn;
    })
  );

  constructor(private http: HttpClient, private router: Router) {}

  login(iAuthData: iAuthData): Observable<iAuthResponse> {
    return this.http.post<iAuthResponse>(this.loginUrl, iAuthData).pipe(
      tap((data) => {
        const decodedToken = this.jwtHelper.decodeToken(data.token);
        const user: Partial<iUser> = {
          id: data.userId,
          email: data.email,
          roles: decodedToken['roles'] || [],
        };

        this.authSubject.next(user);
        localStorage.setItem('accessData', JSON.stringify(data));
        this.autoLogout();
      })
    );
  }

  register(user: Partial<iUser>): Observable<iAuthResponse> {
    return this.http.post<iAuthResponse>(this.registerUrl, user);
  }

  logout(): void {
    this.authSubject.next(null);
    localStorage.removeItem('accessData');
    this.router.navigate(['/']);
  }

  autoLogout(): void {
    const accessData = this.getAccessData();
    console.log('Access data:', accessData);
    if (!accessData) return;
    const expDate = this.jwtHelper.getTokenExpirationDate(
      accessData.token
    ) as Date;
    const expMS = expDate.getTime() - new Date().getTime();
    if (expMS > 0) {
      setTimeout(() => this.logout(), expMS);
    }
  }

  getAccessData(): iAuthResponse | null {
    const accessDataJson = localStorage.getItem('accessData');
    if (!accessDataJson) return null;
    const accessData: iAuthResponse = JSON.parse(accessDataJson);
    return accessData;
  }

  restoreUser(): void {
    const accessData = this.getAccessData();
    if (!accessData) return;
    if (this.jwtHelper.isTokenExpired(accessData.token)) return;
    const user: Partial<iUser> = {
      id: accessData.userId,
      email: accessData.email,
    };
    this.authSubject.next(user);
    this.autoLogout();
  }

  // getUserRole(): string[] | null {
  //   const accessData = this.getAccessData();
  //   if (!accessData) return null;

  //   const decodedToken = this.jwtHelper.decodeToken(accessData.token);

  //   return decodedToken?.roles || null;
  // }

  getUserData(): Observable<iUser> {
    return this.http.get<iUser>(`${this.apiUrl}Auth`).pipe(
      tap((data) => {
        this.authSubject.next(data);
      })
    );
  }
}
