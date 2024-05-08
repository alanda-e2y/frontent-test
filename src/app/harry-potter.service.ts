import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HarryPotterService {
  constructor() {
  }

  getCharacters(): Observable<any[]> {
    return of([]);
  }

  search(query: string): Observable<any[]> {
    return of([]);
  }
}
