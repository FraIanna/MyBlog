import { UserService } from './../../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { iUser } from '../../../models/i-user';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrl: './social.component.scss',
})
export class SocialComponent implements OnInit {
  //dichiarazione variabili
  user!: Partial<iUser>;
  form!: FormGroup;
  socialType: string[] = ['Facebook', 'Instagram', 'Twitter', 'Youtube'];

  constructor(
    private fb: FormBuilder,
    private userSvc: UserService,
    private authSvc: AuthService,
    private dialogRef: MatDialogRef<SocialComponent>
  ) {}

  ngOnInit(): void {
    //recupero utente
    this.authSvc.$user.subscribe((u) => {
      if (u) this.user = u;
    });

    //inizializzazione form
    this.form = this.fb.group({
      url: this.fb.control(null, [Validators.required]),
      platform: this.fb.control(null, [Validators.required]),
    });
  }

  //update dei dati
  updateSocials(): void {
    if (this.user.id)
      this.userSvc.updateSocials(this.user.id, this.form.value).subscribe({
        next: (res) => {
          this.authSvc.getUserData().subscribe((u) => {
            if (u) this.user = u;
            this.dialogRef.close();
          });
        },
        error: (err) => {
          console.error('Error: ', err);
        },
      });
    else throw new Error('Error while trying to recover user id');
  }

  //eliminazione di tutti i social
  deleteSocials(): void {
    this.userSvc.deleteSocials().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error('Errore :', err);
      },
    });
  }

  //eliminazione di un solo social
  deleteSocial(socialId: number): void {
    if (this.user.id) {
      this.userSvc.deleteSocial(this.user.id, socialId).subscribe({
        next: (res) => {
          console.log(res);
          this.authSvc.getUserData().subscribe();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
