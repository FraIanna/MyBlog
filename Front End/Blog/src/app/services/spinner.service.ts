import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  constructor() {}
  spinner: boolean = false;

  show() {
    this.spinner = true;
  }

  hide() {
    this.spinner = false;
  }
}
