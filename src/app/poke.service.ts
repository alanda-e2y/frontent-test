import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, EMPTY, Subscription, catchError } from 'rxjs';

import {
  PokeAPIResponse,
  PokeAPISearchParams,
  Pokemon,
  PokemonDetails,
} from './types';
import { enhancePokemonResults, getSearchParams } from './helpers';
import { Router } from '@angular/router';

export const POKE_API_URL = 'https://pokeapi.co/api/v2';

@Injectable({ providedIn: 'root' })
export class PokeService implements OnDestroy {
  private pokemonsSubject = new BehaviorSubject<Pokemon[]>([]);
  private nextSearchParamsSubject =
    new BehaviorSubject<PokeAPISearchParams | null>(null);
  private previousSearchParamsSubject =
    new BehaviorSubject<PokeAPISearchParams | null>(null);
  private pokemonDetailsSubject = new BehaviorSubject<PokemonDetails | null>(
    null
  );
  private pokemonDetailsErrorSubject = new BehaviorSubject<boolean>(false);

  private pokeAPICache: { [url: string]: PokeAPIResponse } = {};
  private pokemonDetailsCache: { [url: string]: PokemonDetails } = {};

  pokemons$ = this.pokemonsSubject.asObservable();
  nextSearchParams$ = this.nextSearchParamsSubject.asObservable();
  previousSearchParams$ = this.previousSearchParamsSubject.asObservable();
  pokemonDetails$ = this.pokemonDetailsSubject.asObservable();
  pokemonDetailsError$ = this.pokemonDetailsErrorSubject.asObservable();

  getPokemonsSubscription = new Subscription();

  constructor(private http: HttpClient, private router: Router) {}

  getPokemons(limit?: number, offset?: number): void {
    const urlObject = new URL(`${POKE_API_URL}/pokemon`);

    if (limit !== undefined) {
      urlObject.searchParams.set('limit', String(limit));
    }

    if (offset !== undefined) {
      urlObject.searchParams.set('offset', String(offset));
    }

    const url = urlObject.toString();

    if (this.pokeAPICache[url]) {
      const pokeAPIResponse = this.pokeAPICache[url];
      const nextSearchParams = getSearchParams(pokeAPIResponse.next);
      const previousSearchParams = getSearchParams(pokeAPIResponse.previous);
      this.pokemonsSubject.next(pokeAPIResponse.results);
      this.nextSearchParamsSubject.next(nextSearchParams);
      this.previousSearchParamsSubject.next(previousSearchParams);
    } else {
      this.getPokemonsSubscription.add(
        this.http.get<PokeAPIResponse>(url).subscribe((response) => {
          const pokemons = enhancePokemonResults(response.results);
          const nextSearchParams = getSearchParams(response.next);
          const previousSearchParams = getSearchParams(response.previous);
          this.pokemonsSubject.next(pokemons);
          this.nextSearchParamsSubject.next(nextSearchParams);
          this.previousSearchParamsSubject.next(previousSearchParams);
          this.pokeAPICache[url] = {
            ...response,
            results: pokemons,
          };
        })
      );
    }
  }

  getPokemonDetails(id: string): void {
    this.pokemonDetailsErrorSubject.next(false);

    const url = `${POKE_API_URL}/pokemon/${id}`;

    if (this.pokemonDetailsCache[url]) {
      this.pokemonDetailsSubject.next(this.pokemonDetailsCache[url]);
    } else {
      this.getPokemonsSubscription.add(
        this.http
          .get<PokemonDetails>(url)
          .pipe(
            catchError(() => {
              this.pokemonDetailsErrorSubject.next(true);
              this.router.navigate(['']);
              return EMPTY;
            })
          )
          .subscribe((response) => {
            const pokemonDetails = {
              id: response.id,
              name: response.name,
              height: response.height,
              weight: response.weight,
              base_experience: response.base_experience,
            };
            this.pokemonDetailsSubject.next(pokemonDetails);
            this.pokemonDetailsCache[url] = pokemonDetails;
          })
      );
    }
  }

  ngOnDestroy(): void {
    this.getPokemonsSubscription.unsubscribe();
    this.pokeAPICache = {};
    this.pokemonDetailsCache = {};
  }
}
