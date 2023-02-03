import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};

  @Input() updatedUser = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: ''
  }
 

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  /**
   * Get user data from API, store value in "user"
   * @function getUserInfo
   */
  getUserInfo() {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = {
        ...resp,
        Birthday: new Date(resp.Birthday).toLocaleDateString()
      }
      console.log(this.user);
      return this.user;
    })
  }

  /**
   * 
   */
  updateUserInfo() {
    console.log('updateUserInfo',this.updatedUser);

    this.updatedUser = {
      Username: this.updatedUser.Username === "" || null ? this.user.Username : this.updatedUser.Username,
      Password: this.updatedUser.Password === "" || null ? this.user.Password : this.updatedUser.Password,
      Email: this.updatedUser.Email === "" || null ? this.user.Email : this.updatedUser.Email,
      Birthday: this.updatedUser.Birthday === "" || null ? this.user.Birthday : this.updatedUser.Birthday,
    }  

    this.fetchApiData.updateUser(this.updatedUser).subscribe((result) => {
      console.log(result);
      localStorage.setItem('username', result.Username);
      this.snackBar.open('Profile Updated', 'OK', {
        duration: 5000
      });
      window.location.reload();
    }, (result) => {
      console.log(result)
    });
  }

  // delete user
  // deleteUserInfo() {

  // }
}
