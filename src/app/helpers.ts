import { PokeAPISearchParams, Pokemon } from './types';

function getPokemonIdFromUrl(url: string): number {
  const parts = url.split('/');
  const id = parseInt(parts[parts.length - 2], 10);
  return id;
}

export function enhancePokemonResults(results: Pokemon[]): Pokemon[] {
  return results.map<Pokemon>((pokemon) => ({
    ...pokemon,
    id: getPokemonIdFromUrl(pokemon.url),
  }));
}

export function getSearchParams(
  url: string | null
): PokeAPISearchParams | null {
  if (!url) {
    return null;
  }

  const urlObject = new URL(url);
  const params: PokeAPISearchParams = {};

  if (urlObject.searchParams.has('offset')) {
    const offset = Number(urlObject.searchParams.get('offset'));
    if (!isNaN(offset)) {
      params.offset = offset;
    }
  }

  if (urlObject.searchParams.has('limit')) {
    const limit = Number(urlObject.searchParams.get('limit'));
    if (!isNaN(limit)) {
      params.limit = limit;
    }
  }

  return params;
}
