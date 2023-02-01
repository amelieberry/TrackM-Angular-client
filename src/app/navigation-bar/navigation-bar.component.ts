import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  constructor(
    private router: Router
  ) {}

  /**
   * navigate the user to the movies page on click
   */
  navigateMovies() {
    this.router.navigate(['movies']);
  }

  /**
   * navigate the user to the profile page on click
   */
  navigateProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * navigate the user to the welcome page on click and clear localStorage
   */
  logoutUser(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}
