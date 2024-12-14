import { MatDialog } from '@angular/material/dialog';
import { iUser } from '../../../models/i-user';
import { AuthService } from './../../../auth/auth.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ArticleComponent } from '../article/article.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { iArticle } from '../../../models/i-article';
import { ArticleService } from '../../../services/article.service';
import { throwError } from 'rxjs';
import { SocialComponent } from '../social/social.component';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  //dichiarazione variabili
  user!: Partial<iUser>;
  userArticles: iArticle[] = [];
  form!: FormGroup;
  isMedium: boolean = false;
  readonly: boolean = true;
  isVisible: boolean = true;

  //dependency injection
  constructor(
    private authSvc: AuthService,
    private articleSvc: ArticleService,
    private userSvc: UserService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private breakObs: BreakpointObserver
  ) {}

  ngOnInit(): void {
    //recupero dati utente
    this.authSvc.getUserData().subscribe();
    this.authSvc.$user.subscribe((u) => {
      if (u) this.user = u;
      //richiamo della funzione per caricare gli articoli
      this.getUserPosts();
      console.log(this.user);
    });

    this.breakObs.observe(Breakpoints.Medium).subscribe(() => {
      this.isMedium = !this.isMedium;
    });

    //inizializzazione form
    this.form = this.fb.group({
      biography: this.fb.control(
        [this.user.biography || null],
        Validators.required
      ),
    });
  }

  //modale
  openDialog() {
    this.dialog.open(ArticleComponent);
  }

  //recupero degli articoli dell'utente corrente
  getUserPosts() {
    if (this.user && this.user.id) {
      this.articleSvc.getArticleByUser(this.user.id).subscribe({
        next: (res) => {
          this.userArticles = res;
          console.log('Articles :', res);
        },
        error: (err) => {
          console.error('Error, ', err);
        },
      });
    } else {
      throwError(() => new Error('User id not found'));
    }
  }

  //apertura modale
  openSocialDialog(): void {
    this.dialog.open(SocialComponent);
  }

  //update della biografia utente
  updateBiography(): void {
    console.log(this.form.value);
    if (this.form.valid && this.user && this.user.id)
      this.userSvc.updateBiography(this.user.id, this.form.value).subscribe({
        next: (res) => {
          console.log(res);
          this.readonly = true;
          this.isVisible = true;
        },
        error: (err) => {
          console.error('Error while trying to update the biography', err);
        },
      });
  }

  //funzione che modifica le variabili dinamicamente
  changeStatus(): void {
    this.readonly = !this.readonly;
    this.isVisible = !this.isVisible;
    console.log(this.isVisible);
  }

  //nota aggiungere la possibilità di poter eliminare un post e modificarne uno già esistente
}
