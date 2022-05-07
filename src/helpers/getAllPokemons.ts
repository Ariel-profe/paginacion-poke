
import { pokemonApi } from "../api/pokemonsApi";
import { allPokemonsResp, Pokemon, SmallPokemon } from '../interfaces/allPokemonsResp';


export const getAllPokemons = async():Promise<Pokemon[]> => {

    const {data: {results}} = await pokemonApi.get<allPokemonsResp>('/pokemon?limit=1500');
    
    const smallPokemonList = results;
    
    return transformSmallPokemonintoPokemon(smallPokemonList);
};

const transformSmallPokemonintoPokemon = (smallPokemonList:SmallPokemon[] ):Pokemon[] => {

    const pokemonArr:Pokemon[] = smallPokemonList.map(pokemon => {

        const pokeArr = pokemon.url.split('/');
        // const id = pokeArr[pokeArr.length - 2]; forma no fija de obtener el id
        const id = pokeArr[6]; //forma fija de obtener el id
        const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

        return {
            id,
            name: pokemon.name,
            pic
        }
    })

    return pokemonArr;
};