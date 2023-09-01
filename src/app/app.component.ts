import { Component } from '@angular/core';
import { PunkService } from './punk.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontent-test';
  beers$ = this.punkService.getAllBeers();

  constructor(public punkService: PunkService) {}
}
