import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  allMovies: Movie[] = [];
  filteredMovies: Movie[] = [];
  imageBase = 'https://image.tmdb.org/t/p/original';

  constructor(public movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.movieService.getMovieList().subscribe(movies => {
      this.allMovies = movies;
      this.filteredMovies = movies;
      this.movieService.movieList.set(movies);
    });
  }

  onSearch(term: string): void {
    if (!term.trim()) {
      this.filteredMovies = this.allMovies;
    } else {
      this.filteredMovies = this.allMovies.filter(m =>
        m.title.toLowerCase().includes(term.toLowerCase()) ||
        m.original_title.toLowerCase().includes(term.toLowerCase())
      );
    }
  }

  goToDetail(movie: Movie): void {
    this.movieService.selectedMovie.set(movie);
    this.router.navigate(['/movie', movie.id]);
  }
}
