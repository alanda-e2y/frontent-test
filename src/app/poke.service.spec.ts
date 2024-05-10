import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PokeService, POKE_API_URL } from './poke.service';

describe('PokeService', () => {
  let service: PokeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokeService],
    });
    service = TestBed.inject(PokeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve pokemons', () => {
    const mockResponse = {
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      ],
      next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
      previous: null,
    };

    service.getPokemons();

    const req = httpTestingController.expectOne(`${POKE_API_URL}/pokemon`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockResponse);

    service.pokemons$.subscribe((pokemons) => {
      expect(pokemons.length).toBe(2);
      expect(pokemons[0].name).toBe('bulbasaur');
      expect(pokemons[1].name).toBe('ivysaur');
    });
  });

  it('should retrieve pokemon details', () => {
    const mockPokemonDetails = {
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      base_experience: 64,
    };

    service.getPokemonDetails('1');

    const req = httpTestingController.expectOne(`${POKE_API_URL}/pokemon/1`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockPokemonDetails);

    service.pokemonDetails$.subscribe((pokemonDetails) => {
      expect(pokemonDetails?.id).toBe(1);
      expect(pokemonDetails?.name).toBe('bulbasaur');
      expect(pokemonDetails?.height).toBe(7);
      expect(pokemonDetails?.weight).toBe(69);
      expect(pokemonDetails?.base_experience).toBe(64);
    });
  });

  it('should handle error while retrieving pokemon details', () => {
    service.getPokemonDetails('invalid');

    const req = httpTestingController.expectOne(
      `${POKE_API_URL}/pokemon/invalid`
    );
    expect(req.request.method).toEqual('GET');

    req.error(new ErrorEvent('error'));

    service.pokemonDetailsError$.subscribe((error) => {
      expect(error).toBe(true);
    });
  });

  it('should unsubscribe on destroy', () => {
    spyOn(service.getPokemonsSubscription, 'unsubscribe');
    service.ngOnDestroy();
    expect(service.getPokemonsSubscription.unsubscribe).toHaveBeenCalled();
  });
});
