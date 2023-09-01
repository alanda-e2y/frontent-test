import { Injectable } from '@angular/core';
import { Beer } from 'src/app/models/beer';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PunkAPIService {

  private apiUrl: string = 'https://api.punkapi.com/v2';

  constructor(private apiClient: HttpClient) { }

  public getBeers(): Observable<Beer[]> {
    return this.apiClient.get<Beer[]>(`${this.getApiUrl()}/beers`)
      .pipe(map((value) => {
        let beerArray: Beer[] = [];
        for(let i = 0; i < value.length; i++) {
          beerArray.push(
            new Beer(
              value[i].id,
              value[i].name,
              value[i].tagline,
              value[i].first_brewed,
              value[i].description,
              value[i].image_url,
              value[i].abv,
              value[i].ibu,
              value[i].target_fg,
              value[i].target_og,
              value[i].ebc,
              value[i].srm,
              value[i].ph,
              value[i].attenuation_level,
              value[i].brewers_tips,
              value[i].contributed_by
            )
          );
        }
        return beerArray;
      }));
  }

  public getBeersByName(name: string): Observable<Beer[]> {
    return this.apiClient.get<Beer[]>(`${this.getApiUrl()}/beers?beer_name=${name}&page=1&per_page=10`)
    .pipe(map((value) => {
      let beerArray: Beer[] = [];
      for(let i = 0; i < value.length; i++) {
        beerArray.push(
          new Beer(
            value[i].id,
            value[i].name,
            value[i].tagline,
            value[i].first_brewed,
            value[i].description,
            value[i].image_url,
            value[i].abv,
            value[i].ibu,
            value[i].target_fg,
            value[i].target_og,
            value[i].ebc,
            value[i].srm,
            value[i].ph,
            value[i].attenuation_level,
            value[i].brewers_tips,
            value[i].contributed_by
          )
        );
      }
      return beerArray;
    }));
  }

  public getBeersById(id: number): Observable<Beer[]> {
    return this.apiClient.get<Beer[]>(`${this.getApiUrl()}/beers/${id}`);
  }

  public getApiUrl(): string {
    return this.apiUrl;
  }

  public setApiUrl(url: string): void {
    this.apiUrl = url;
  }

}
