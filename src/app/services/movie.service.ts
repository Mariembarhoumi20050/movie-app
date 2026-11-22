import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Movie, MovieResponse } from '../models/movie.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private http = inject(HttpClient);

  url = environment.url_api;
  key = environment.api_key;
  movieUrl = environment.url_movie_api;

  movieList = signal<Movie[]>([]);
  selectedMovie = signal<Movie | null>(null);
  wishList = signal<Movie[]>([]);

  constructor() {
    this.loadWishlistFromStorage();
  }

  getMovieList(): Observable<Movie[]> {
    return this.http.get<MovieResponse>(`${this.url}?api_key=${this.key}`).pipe(
      map(res => res.results),
      shareReplay({ bufferSize: 1, refCount: false })
    );
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.movieUrl}/${id}?api_key=${this.key}`);
  }

  addToWishlist(movie: Movie): void {
    const stored = localStorage.getItem('wishlist');
    let list: Movie[] = stored ? JSON.parse(stored) : [];
    const exists = list.find(m => m.id === movie.id);
    if (!exists) {
      list.push(movie);
      localStorage.setItem('wishlist', JSON.stringify(list));
      this.wishList.set(list);
    }
  }

  removeFromWishlist(movie: Movie): void {
    const stored = localStorage.getItem('wishlist');
    let list: Movie[] = stored ? JSON.parse(stored) : [];
    list = list.filter(m => m.id !== movie.id);
    localStorage.setItem('wishlist', JSON.stringify(list));
    this.wishList.set(list);
  }

  isInWishlist(movie: Movie): boolean {
    return this.wishList().some(m => m.id === movie.id);
  }

  private loadWishlistFromStorage(): void {
    const stored = localStorage.getItem('wishlist');
    if (stored) {
      this.wishList.set(JSON.parse(stored));
    }
  }
}
