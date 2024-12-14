import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../services/article.service';
import { iArticle } from '../../../models/i-article';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  articles: iArticle[] = [];
  filteredArticles: iArticle[] = [];
  loadedArticles: iArticle[] = [];
  searchValue: string = '';

  constructor(private articleSvc: ArticleService) {}

  ngOnInit(): void {
    //recupero di tutti gli articoli
    this.articleSvc.getArticles().subscribe({
      next: (articles) => {
        this.articles = articles;
        this.loadedArticles = articles.slice(0, 10);
        this.filteredArticles = articles;
        console.log(this.filteredArticles);
      },
      error: (error) => {
        console.error('Error retrieving articles', error);
      },
    });
  }

  // Metodo chiamato ogni volta che l'utente digita qualcosa nell'input.
  onInput(e: Event): void {
    const value: string = (<HTMLInputElement>e.target).value.toLowerCase();
    this.searchValue = value;

    const filtered = this.articles.filter((article) =>
      article.title.toLowerCase().includes(value)
    );

    this.filteredArticles = filtered.slice(0, 10);

    console.log(this.filteredArticles);
  }

  redirect(): void {
    //nota aggiungere una pagina dettaglio per un articolo
    console.log('funziona');
  }

  //funzione base per filtrare l'array
  loadBase1(arr?: iArticle[]) {
    if (arr) {
      return arr.filter((a) =>
        a.title?.toLowerCase().includes(this.searchValue)
      );
    } else {
      return [];
    }
  }

  //funzione base che implementa la prima
  loadBase2(arr1: iArticle[], arr2?: iArticle[]): iArticle[] {
    const currentLength = arr1.length;

    const filteredArr = this.loadBase1(arr2);

    if (filteredArr) {
      const additionalArticles = filteredArr.slice(
        currentLength,
        currentLength + 10
      );
      return [...arr1, ...additionalArticles];
    } else {
      throw new Error('Errore array vuoto');
    }
  }

  //funzione che permette di caricare altri risultati
  loadMore(): void {
    this.filteredArticles = this.loadBase2(
      this.filteredArticles,
      this.articles
    );
  }

  loadMoreArticlesOnScroll(): void {
    const bottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight;
    if (bottom) this.loadedArticles = this.loadBase2(this.loadedArticles);
  }

  //testare le funzionalità aggiungendo più articoli.

  // loadMore(): void {
  //   const currentLength = this.filteredArticles.length;

  //   const additionalArticles = this.articles
  //     .filter((article) =>
  //       article.title?.toLowerCase().includes(this.searchValue)
  //     )
  //     .slice(currentLength, currentLength + 10);

  //   this.filteredArticles = [...this.filteredArticles, ...additionalArticles];
  // }

  // loadMoreArticlesOnScroll(): void {
  //   const currentLength = this.loadedArticles.length;

  //   const additionalArticles = this.articles.slice(
  //     currentLength,
  //     currentLength + 10
  //   );

  //   this.loadedArticles = [...this.articles, ...additionalArticles];
  // }
}
