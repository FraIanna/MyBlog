import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iAuthData } from '../../models/i-auth-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  //form reattivo
  form!: FormGroup;

  //iniezione dei servizi
  constructor(
    private authSvc: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    //inizializzazione form
    this.form = this.fb.group({
      email: this.fb.control(null, [Validators.required, Validators.email]),
      password: this.fb.control(null, [Validators.required]),
    });
  }

  //metodo di login
  login(): void {
    if (this.form.valid) {
      const authData: iAuthData = this.form.value;
      this.authSvc.login(authData).subscribe({
        next: (res) => {
          console.log(res);
          //reindirizzamento dopo il login
          this.router.navigate(['/Profile']);
        },
        error: (err) => {
          console.error('login failed', err);
        },
      });
    }
  }
}
