import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * Allow components in the application to read and update visibility status
 */
export class LoadingSpinnerService {
  count = 0;
  visibility: BehaviorSubject<boolean>

  constructor() {
    this.visibility = new BehaviorSubject(false);
  }

  show() {
    this.visibility.next(true);
    this.count++;
  }

  hide() {
    this.count--;
    if (this.count === 0) {
      this.visibility.next(false);
    }
  }
}
