import { Component, OnInit, Input } from '@angular/core';

// Angular Material Imports
import { MatSnackBar } from '@angular/material/snack-bar'; // to display notifications back to user

import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: ''
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar
  ) { }

  // called once the component has received all its inputs from the calling component
  ngOnInit(): void {

  }

  /**
   * send the form inputs to the backend
   * @function registerUser
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {

      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}
