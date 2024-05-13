import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HarryPotterService {
  private apiUrl = 'https://api.potterdb.com/v1/characters';
  numberSearchResult: number = 10;
  showAll: number = 100;

  constructor(
    private http: HttpClient
  ) { }

  getCharacters(query?: string): Observable<any[]> {
    return this.http.get<{data: any[]}>(this.apiUrl).pipe(
      map(response => {
        const characters = response.data.map(char => ({
          id: char.id,
          type: char.type,
          attributes: char.attributes
        }));

        if (query) {
          return characters.filter(char => char.attributes.name.toLowerCase()
          .includes(query.toLowerCase())).slice(0, this.numberSearchResult);
        }
        return characters.slice(0, this.showAll);
      }),
      catchError(error => {
        console.error('Error fetching characters:', error);
        return throwError(error);
      })
    );
  }
}
