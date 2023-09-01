import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PunkService {
  constructor() {
  }

  getAllBeers(): Observable<any[]> {
    return of([]);
  }

  search(query: string): Observable<any[]> {
    return of([]);
  }
}
