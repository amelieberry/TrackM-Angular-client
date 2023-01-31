import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-director',
  templateUrl: './movie-director.component.html',
  styleUrls: ['./movie-director.component.scss']
})
export class MovieDirectorComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) 
      public data: {
        Name: string;
        Bio: string;
        Birth: string;
      }
  ) {}
}
