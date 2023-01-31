import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-summary',
  templateUrl: './movie-summary.component.html',
  styleUrls: ['./movie-summary.component.scss']
})
export class MovieSummaryComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) 
      public data: {
        Title: string,
        Description: string,
      }
  ) {}
}
