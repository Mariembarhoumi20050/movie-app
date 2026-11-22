import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-head-bar',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './head-bar.component.html',
  styleUrls: ['./head-bar.component.css']
})
export class HeadBarComponent {
  faHeart = faHeart;

  constructor(private router: Router) {}

  goToWishlist(): void {
    this.router.navigate(['/wishlist']);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
