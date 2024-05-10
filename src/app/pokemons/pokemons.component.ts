import { Component, OnInit } from '@angular/core';
import { PokeAPISearchParams, Pokemon } from '../types';
import { Observable, of } from 'rxjs';
import { PokeService } from '../poke.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrl: './pokemons.component.css',
})
export class PokemonsComponent implements OnInit {
  searchValue = '';

  pokemons$: Observable<Pokemon[]> = of([]);
  nextSearchParams$: Observable<PokeAPISearchParams | null> = of(null);
  previousSearchParams$: Observable<PokeAPISearchParams | null> = of(null);
  pokemonDetailsError$: Observable<boolean> = of(false);

  onSearch() {
    if (this.searchValue) {
      this.router.navigate([`/${this.searchValue.trim().toLowerCase()}`]);
      this.searchValue = '';
    }
  }

  constructor(
    public pokeService: PokeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pokemons$ = this.pokeService.pokemons$;
    this.nextSearchParams$ = this.pokeService.nextSearchParams$;
    this.previousSearchParams$ = this.pokeService.previousSearchParams$;
    this.pokemonDetailsError$ = this.pokeService.pokemonDetailsError$;
    this.pokeService.getPokemons();
  }
}
