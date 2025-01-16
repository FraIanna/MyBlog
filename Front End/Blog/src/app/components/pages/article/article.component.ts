import { iArticle } from './../../../models/i-article';
import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../services/article.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { iCategory } from '../../../models/i-category';
import { iUser } from '../../../models/i-user';
import { AuthService } from '../../../auth/auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent implements OnInit {
  form!: FormGroup;
  fileName: string = '';
  categories: iCategory[] = [];
  user: Partial<iUser> | null = null;
  file!: File;
  constructor(
    private articleSvc: ArticleService,
    private fb: FormBuilder,
    private authSvc: AuthService,
    private dialogRef: MatDialogRef<ArticleComponent>
  ) {}

  ngOnInit(): void {
    // Inizializzazione del modulo con campi e validazioni.
    this.form = this.fb.group({
      title: this.fb.control(null, [Validators.required]),
      content: this.fb.control(null, [Validators.required]),
      fileUpload: this.fb.control(null),
      categoryId: this.fb.control(null, [Validators.required]),
    });

    // Recupero delle categorie disponibili dal backend.
    this.articleSvc.getArticleCategories().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (err) => {
        console.error('Error while trying to get the categories', err);
      },
    });

    //recupero dati utente
    this.authSvc.$user.subscribe((user) => {
      if (user) this.user = user;
    });

    console.log(this.user);
  }

  // Metodo per gestire il caricamento di un file selezionato dall'utente - in corso -
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
    } else console.error('error while trying to select the file.');
    // implementare l'upload
  }

  // Metodo per creare un articolo.
  createArticle() {
    if (this.form.valid || this.user) {
      const formValue = this.form.value;

      const formData = new FormData();
      formData.append('title', formValue.title);
      formData.append('content', formValue.content);
      formData.append('imageFile', this.file);
      formData.append('categoryId', formValue.categoryId);

      this.articleSvc.createArticle(formData).subscribe({
        next: (res) => {
          console.log('Article created', res);
          this.dialogRef.close();
        },
        error: (err) => {
          console.error('Error while trying to create the article', err);
        },
      });
    } else {
      console.error('Invalid form');
    }
  }
}
