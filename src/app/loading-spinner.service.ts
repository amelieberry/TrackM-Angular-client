import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * Allow components in the application to read and update visibility status
 */
export class LoadingSpinnerService {
  visibility: BehaviorSubject<boolean>

  constructor() {
    this.visibility = new BehaviorSubject(false);
  }

  show() {
    this.visibility.next(true);
  }

  hide() {
    this.visibility.next(false);
  }
}
