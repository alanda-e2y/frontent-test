import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PokemonDetailsComponent } from './pokemon-details.component';
import { PokeService } from '../poke.service';
import { PokemonDetails } from '../types';
import { of } from 'rxjs';

const mockPokemonDetails: PokemonDetails = {
  id: 42,
  name: 'Pikachu',
  height: 69,
  weight: 420,
  base_experience: 9000,
};

describe('PokemonDetailsComponent', () => {
  let component: PokemonDetailsComponent;
  let fixture: ComponentFixture<PokemonDetailsComponent>;
  let pokeService: PokeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonDetailsComponent],
      imports: [HttpClientTestingModule, RouterModule.forRoot([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: String(mockPokemonDetails.id) } },
          },
        },
        {
          provide: PokeService,
          useValue: {
            getPokemonDetails: () => {},
            pokemonDetails$: of(mockPokemonDetails),
          },
        },
      ],
    }).compileComponents();

    pokeService = TestBed.inject(PokeService);
    fixture = TestBed.createComponent(PokemonDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the correct pokemon details', () => {
    const getPokemonDetailsSpy = spyOn(pokeService, 'getPokemonDetails');

    fixture.detectChanges();

    expect(getPokemonDetailsSpy).toHaveBeenCalledWith(
      String(mockPokemonDetails.id)
    );

    const element = fixture.nativeElement;

    expect(element.querySelector('.name').textContent).toBe(
      mockPokemonDetails.name.toUpperCase()
    );
    expect(element.querySelector('.height').textContent).toBe(
      `Height: ${mockPokemonDetails.height}`
    );
    expect(element.querySelector('.weight').textContent).toBe(
      `Weight: ${mockPokemonDetails.weight}`
    );
    expect(element.querySelector('.xp').textContent).toBe(
      `XP: ${mockPokemonDetails.base_experience}`
    );
  });

  it('should navigate to home page when clicking on GO Back', () => {
    const goBackSpy = spyOn(component, 'onGoBack');

    fixture.debugElement.nativeElement.querySelector('.back-button').click();

    expect(goBackSpy).toHaveBeenCalled();
  });
});
