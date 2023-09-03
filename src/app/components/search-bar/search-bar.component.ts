import { Component, EventEmitter, Output } from '@angular/core';
import { Beer } from 'src/app/models/beer';
import { PunkAPIService } from 'src/app/services/punkAPI/punk-api.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  constructor(private punkAPIService: PunkAPIService) { }


  public searchTerm: string = '';
  @Output() beers = new EventEmitter <Beer[]>();

  public searchTermChange(event: any): void {
    this.searchTerm = event.target.value;
  }
  
  public doSearch() {
    if(this.searchTerm === '') {
      return this.punkAPIService.getBeers().subscribe({
        next: (value) => {
          this.beers.emit(value);
        }, 
        error: (error:any) => {
          console.error(error);
        }
      })
    }else{
      return this.punkAPIService.getBeersByName(this.searchTerm).subscribe({
        next: (value) => {
          this.beers.emit(value);
        }, 
        error: (error:any) => {
          console.error(error);
        }
      });
    }
  }

  public doSearchEmpty() {
    this.searchTerm = '';
    this.doSearch();
  }


}
