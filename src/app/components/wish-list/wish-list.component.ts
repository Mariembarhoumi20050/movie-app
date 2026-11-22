import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent {
  imageBase = 'https://image.tmdb.org/t/p/original';
  faHeart = faHeart;
  faTrash = faTrash;

  constructor(public movieService: MovieService, private router: Router) {}

  goToDetail(movie: Movie): void {
    this.movieService.selectedMovie.set(movie);
    this.router.navigate(['/movie', movie.id]);
  }

  remove(movie: Movie): void {
    this.movieService.removeFromWishlist(movie);
  }
}
