import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | null = null;
  imageBase = 'https://image.tmdb.org/t/p/original';
  faHeart = faHeart;
  faHeartRegular = faHeartRegular;

  constructor(
    public movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.movieService.selectedMovie()?.id === id) {
      this.movie = this.movieService.selectedMovie();
    } else {
      this.movieService.getMovieById(id).subscribe(movie => {
        this.movie = movie;
        this.movieService.selectedMovie.set(movie);
      });
    }
  }

  isWishlisted(): boolean {
    return this.movie ? this.movieService.isInWishlist(this.movie) : false;
  }

  toggleWishlist(): void {
    if (!this.movie) return;
    if (this.isWishlisted()) {
      this.movieService.removeFromWishlist(this.movie);
    } else {
      this.movieService.addToWishlist(this.movie);
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
