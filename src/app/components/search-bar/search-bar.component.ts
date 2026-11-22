import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Output() searchEvent = new EventEmitter<string>();
  faMagnifyingGlass = faMagnifyingGlass;
  searchTerm = '';

  onSearch(): void {
    this.searchEvent.emit(this.searchTerm);
  }

  onInputChange(): void {
    this.searchEvent.emit(this.searchTerm);
  }
}
