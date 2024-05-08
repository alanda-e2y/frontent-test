import { Component } from '@angular/core';
import { HarryPotterService } from './harry-potter.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend-challenge';
  characters$ = this.harryPotterService.getCharacters();

  constructor(public harryPotterService: HarryPotterService) {}
}
