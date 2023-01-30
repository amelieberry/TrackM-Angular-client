import { Component, OnInit, Input } from '@angular/core';

// Angular Material Imports
import { MatDialogRef } from '@angular/material/dialog'; // to close dialog on success
import { MatSnackBar } from '@angular/material/snack-bar'; // to display notifications back to user

import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent {

  @Input() userData = {
    Username: '',
    Password: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  // called once the component has received all its inputs from the calling component
  ngOnInit(): void {

  }

  // send the form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {

      // set user in local storage
      localStorage.setItem('username', result.user.Username);
      localStorage.setItem('token', result.token);

      this.dialogRef.close();
      console.log(result);
      this.snackBar.open('Logged-in successfully!', 'OK', {
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
