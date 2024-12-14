import { map, Observable } from 'rxjs';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  // dichiarazione variabili
  isSmallScreen: boolean = false;
  isLoggedIn!: boolean;

  constructor(
    private breakObs: BreakpointObserver,
    private authSvc: AuthService
  ) {}

  ngOnInit(): void {
    //check dello schermo
    this.breakObs.observe(Breakpoints.XSmall).subscribe((res) => {
      if (!res.matches) this.isSmallScreen = true;
      else this.isSmallScreen = false;
    });
    //check dell'utente loggato
    this.authSvc.isLoggedIn$.subscribe((res) => {
      this.isLoggedIn = res;
      console.log(this.isLoggedIn);
    });
  }

  //funzione di logout
  logout(): void {
    this.authSvc.logout();
  }
}
