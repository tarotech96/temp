import axios from "axios";
import { useEffect, useMemo, useState } from "react"

interface Pokemon {
  id: number;
  base_experience: number;
  height: number;
  name: string;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    }
  }[];
  weight: number;
  sprites: {
    back_default: string;
    back_female: null;
    back_shiny: string;
    back_shiny_female: null;
    front_default: string;
    front_female: null;
    front_shiny: string;
    front_shiny_female: null;
  }
}

interface DataApi {
  count: number;
  next: string;
  previous: boolean;
  results: {
    name: string;
    url: string;
  }[];
}

const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon/?limit=500';

export const usePokemons = (): {
  pokemonsRender: Pokemon[];
  setKeySearch: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  totalPages: number;
} => {
  const [listPokemons, setListPokemons] = useState<Pokemon[]>([]);
  const [keySearch, setKeySearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  // Using useMemo to recompute list pokemon when key search changes
  const pokemons = useMemo(() => {
    return listPokemons.filter((el) => {
      return keySearch ? el.name.includes(keySearch.toLowerCase()) : true;
    });
  }, [listPokemons, keySearch]);

  // The total number of pages
  const totalPages = pokemons.length && Math.round(Math.max(0, Math.max(...pokemons.map(({ id }) => id))) / 12);

  // List pokemons for rendering
  const pokemonsRender = useMemo(() => {
    const begin = (page - 1) * 12; // 12 = rowsPerPage
    const end = page * 12;
    return pokemons.slice(begin, end);
  }, [pokemons, page]);

  /**
   * Get pokemon from url
   * @param url is url to get pokemon detail
   * @return a promise with type Pokemon
   */
  const getPokemon = async (url: string): Promise<Pokemon> => {
    try {
      const data = await axios.get(url);
      const pokemon: Pokemon = await data.data;
      return pokemon;
    } catch (error) {
      throw error;
    }
  }

  // Using useEffect to get data after component is mounted
  useEffect(() => {
    const getAllPokemons = async (pokemonApi: string): Promise<Pokemon[]> => {
      try {
        let listPromisePokemon: Promise<Pokemon>[] = []
        const response = await axios.get(pokemonApi);
        const data: DataApi = await response.data;
        if (data.results.length) {
          data.results.forEach(el => {
            listPromisePokemon.push(getPokemon(el.url))
          })
        }
        return await Promise.all(listPromisePokemon);
      } catch (error) {
        throw error;
      }
    }

    getAllPokemons(POKEMON_API)
      .then(data => setListPokemons(data))
      .catch((err) => { throw new Error(err) })
  }, [])

  return {
    pokemonsRender,
    setKeySearch,
    setPage,
    page,
    totalPages
  }
}