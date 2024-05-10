import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PokemonsComponent } from './pokemons.component';
import { Pokemon } from '../types';
import { PokeService } from '../poke.service';
import { of } from 'rxjs';

const mockPokemons: Pokemon[] = [
  { id: 1, name: 'Pikachu', url: '' },
  { id: 2, name: 'Charizard', url: '' },
  { id: 3, name: 'Bulbasaur', url: '' },
];

describe('PokemonsComponent', () => {
  let component: PokemonsComponent;
  let fixture: ComponentFixture<PokemonsComponent>;
  let pokeService: PokeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonsComponent],
      imports: [HttpClientTestingModule, FormsModule, RouterModule.forRoot([])],
      providers: [
        {
          provide: PokeService,
          useValue: {
            getPokemons: () => {},
            pokemons$: of(mockPokemons),
          },
        },
      ],
    }).compileComponents();

    pokeService = TestBed.inject(PokeService);
    fixture = TestBed.createComponent(PokemonsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the pokemons', () => {
    const getPokemonsSpy = spyOn(pokeService, 'getPokemons');

    fixture.detectChanges();

    expect(getPokemonsSpy).toHaveBeenCalled();

    const element = fixture.nativeElement;

    expect(element.querySelectorAll('.poke-card').length).toBe(
      mockPokemons.length
    );

    const pokemonNames = element.querySelectorAll('.poke-card-text');

    pokemonNames.forEach((pokmonName: any, index: number) =>
      expect(pokmonName.textContent).toBe(
        mockPokemons[index].name.toUpperCase()
      )
    );
  });
});
