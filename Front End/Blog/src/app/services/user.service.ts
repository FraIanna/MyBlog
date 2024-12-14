import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { iSocial } from '../models/i-social';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userUrl: string = `${environment.apiUrl}User/socials`;

  constructor(private http: HttpClient) {}

  updateSocials(userId: number, socials: iSocial[]): Observable<iSocial[]> {
    return this.http.put<iSocial[]>(`${this.userUrl}/${userId}`, socials);
  }

  deleteSocial(userId: number, socialId: number): Observable<iSocial> {
    return this.http.delete<iSocial>(`${this.userUrl}/${userId}/${socialId}`);
  }

  deleteSocials(): Observable<iSocial[]> {
    return this.http.delete<iSocial[]>(`${this.userUrl}`);
  }

  updateBiography(userId: number, biography: string): Observable<string> {
    return this.http.put<string>(
      `${this.userUrl}/biography/${userId}`,
      biography
    );
  }
}
