import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PokemonDetails } from '../types';
import { PokeService } from '../poke.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.css',
})
export class PokemonDetailsComponent implements OnInit {
  pokemonDetails$: Observable<PokemonDetails | null> = of(null);

  constructor(
    private pokeService: PokeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pokemonDetails$ = this.pokeService.pokemonDetails$;
    const pokemonId = this.route.snapshot.params['id'] as string;
    this.pokeService.getPokemonDetails(pokemonId);
  }

  onGoBack(): void {
    this.router.navigate(['']);
  }
}
