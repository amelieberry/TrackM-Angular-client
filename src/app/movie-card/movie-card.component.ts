import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieSummaryComponent } from '../movie-summary/movie-summary.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  /**
   * fetch movies from FetchApiDataService service getAllMovies()
   * @returns an array of all movies
   * @function getMovies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * fetch favorite movies from FetchApiDataService service getUser()
   * @returns an empty array or an array of movies favorited by the user
   * @function getFavorites
   */
  getFavorites(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favoriteMovies = resp.FavoriteMovies;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    });
  }

  toggleFavoriteMovies(id: string) {
    if (!this.favoriteMovies.includes(id)) {
      this.fetchApiData.addFavoriteMovie(id).subscribe((res) => {
        this.favoriteMovies = res.FavoriteMovies;
        this.snackBar.open('Added to favorites.', 'OK', {
          duration: 3000
        })
      }, (res) => {
        this.snackBar.open(res.message, 'OK', {
          duration: 3000
        });
      })
    } else {
      this.fetchApiData.deleteFavoriteMovies(id).subscribe((res) => {
        this.favoriteMovies = res.FavoriteMovies;
        this.snackBar.open('Removed from favorites.', 'OK', {
          duration: 3000
        })
      }, (res) => {
        this.snackBar.open(res.message, 'OK', {
          duration: 3000
        });
      })
    }
  }

  /**
   * opens the MovieGenreComponent dialog
   * @param name 
   * @param description
   * @function openGenreDialog 
   */
  openGenreDialog(name: string, description: string) {
    this.dialog.open(MovieGenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '300px'
    });
  }

  /**
   * opens the MovieDirectorComponent dialog
   * @param name 
   * @param bio 
   * @param birth
   * @function openDirectorDialog 
   */
  openDirectorDialog(name: string, bio: string, birth: string) : void {
    this.dialog.open(MovieDirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
      width: '300px'
    });
  }

  /**
   * opens the MovieSummaryComponent dialog
   * @param title 
   * @param description 
   * @function openSummaryDialog
   */
  openSummaryDialog(title: string, description: string) : void {
    this.dialog.open(MovieSummaryComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '300px'
    });
  }
}
