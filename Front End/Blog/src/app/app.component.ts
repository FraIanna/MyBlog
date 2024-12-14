import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Blog';
  isSmallScreen: boolean = false;

  constructor(
    private breakObs: BreakpointObserver,
    private authSvc: AuthService,
    public spinnerSvc: SpinnerService
  ) {}

  ngOnInit(): void {
    // check della grandezza dello schermo per mostrare un layout piuttosto che un altro
    this.breakObs.observe(Breakpoints.XSmall).subscribe((res) => {
      if (!res.matches) this.isSmallScreen = true;
      else this.isSmallScreen = false;
    });

    // restore dell'utente al caricamento dell'applicazione
    this.authSvc.restoreUser();
  }
}
