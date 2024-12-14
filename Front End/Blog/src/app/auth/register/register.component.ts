import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { iUser } from '../../models/i-user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  //form reattivo
  form!: FormGroup;

  constructor(private authSvc: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    //inizializzazione form
    this.form = this.fb.group(
      {
        name: this.fb.control(null, [Validators.required]),
        surname: this.fb.control(null, Validators.required),
        email: this.fb.control(null, [Validators.required, Validators.email]),
        password: this.fb.control(null, [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&-])[A-Za-z\\d@$!%*?&-]{10,50}$'
          ),
        ]),
        confirmPassword: this.fb.control(null, [Validators.required]),
      },
      { validator: this.passwordMatchValidator }
    );
  }

  // Metodo per registrare un nuovo utente.
  register(): void {
    if (this.form.valid) {
      const user: iUser = this.form.value;
      this.authSvc.register(user).subscribe({
        next: () => {
          console.log('registrazione completata!');
        },
        error: (err) => {
          console.log(`errore, ${err}`);
        },
      });
    }
  }

  // Validatore personalizzato per controllare se le password coincidono.
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    return password?.value === confirmPassword?.value
      ? null
      : { passwordMatch: true };
  }
}
