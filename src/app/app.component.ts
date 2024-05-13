import { Component } from '@angular/core';
import { HarryPotterService } from './harry-potter.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend-challenge';
  characters$ = this.harryPotterService.getCharacters();
  searchQuery: string = '';

  constructor(
    public harryPotterService: HarryPotterService
  ) { }

  onSearch() {
    this.loadCharacters(this.searchQuery);
  }

  loadCharacters(query?: string) {
    this.characters$ = this.harryPotterService.getCharacters(query);
  }
  
  clear() {
    this.characters$ = this.harryPotterService.getCharacters();
    this.searchQuery = '';
  }
}
