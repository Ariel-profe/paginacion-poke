import { useEffect, useState } from "react";

import { getAllPokemons } from '../helpers/getAllPokemons';
import { Pokemon } from "../interfaces/allPokemonsResp";


export const usePokemon = ()=>{

    const [isLoading, setIsLoading] = useState(true);
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);


    useEffect(() => {
        //Carga de los Pokemons
        getAllPokemons()
                .then(pokemons => {
                    setIsLoading(false);
                    setPokemons(pokemons);
                })
    }, [])
    
    return {
        isLoading,
        pokemons
    };
};