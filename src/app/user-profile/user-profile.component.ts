import { Component, Input, OnInit } from '@angular/core';
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
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = {
        ...resp     
      }
      return this.user;
    })
  }
}
