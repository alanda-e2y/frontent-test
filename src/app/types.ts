export type PokeAPIResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
};

export type PokeAPISearchParams = {
  offset?: number;
  limit?: number;
};

export type Pokemon = {
  id: number;
  name: string;
  url: string;
};

export type PokemonDetails = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
};
