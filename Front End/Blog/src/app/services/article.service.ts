import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iArticle } from '../models/i-article';
import { iCategory } from '../models/i-category';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articleUrl: string = `${environment.apiUrl}Article`;

  constructor(private http: HttpClient) {}

  getArticles(): Observable<iArticle[]> {
    return this.http.get<iArticle[]>(this.articleUrl);
  }

  getArticleById(id: number): Observable<iArticle> {
    return this.http.get<iArticle>(`${this.articleUrl}/${id}`);
  }

  createArticle(article: iArticle | FormData): Observable<iArticle> {
    return this.http.post<iArticle>(`${this.articleUrl}/create`, article);
  }

  updateArticle(id: number, article: iArticle): Observable<iArticle> {
    return this.http.put<iArticle>(`${this.articleUrl}/${id}`, article);
  }

  deleteArticle(id: number): Observable<iArticle> {
    return this.http.delete<iArticle>(`${this.articleUrl}/${id}`);
  }

  getArticleCategories(): Observable<iCategory[]> {
    return this.http.get<iCategory[]>(`${this.articleUrl}/category`);
  }

  getArticleByUser(id: number): Observable<iArticle[]> {
    return this.http.get<iArticle[]>(`${this.articleUrl}/user/${id}`);
  }
}
