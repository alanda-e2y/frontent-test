import { Component, OnInit } from '@angular/core';
import { PunkAPIService } from 'src/app/services/punkAPI/punk-api.service';
import { Beer } from './models/beer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public beers:Array<Beer> = [];

  constructor(private punkAPIService: PunkAPIService) { }
  ngOnInit() {
    this.allBeers();
  }

  public allBeers(){
    console.log("allBeers");
    this.beers= [];
    console.log(this.beers);
    this.punkAPIService.getBeers()
    .subscribe({
      next: (value) => {
        console.log("ngOnInit", value);
        this.beers = value;
      }, 
      error: (error:any) => {
        console.error(error);
      }
    });
  }

  public getBeers(): Array<Beer> {
    console.log("appcomponent getbeers", this.beers);
    return this.beers;
  }

  public setBeers(value: Array<Beer>) {
    this.beers = value;
  }
}
