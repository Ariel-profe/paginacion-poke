import { usePokemon } from '../hooks/usePokemons';
import { Loading } from '../components/Loading';
import { Pokemon } from '../interfaces/allPokemonsResp';
import { ChangeEvent, useState } from 'react';


const HomePage = () => {

  const {isLoading, pokemons} = usePokemon();
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');

  const filteredPokemons = ():Pokemon[] => {

    if(search === '') {
      return pokemons.slice(currentPage, currentPage + 5)
    }

    // Si hay algo en el input para buscar
    const filtered = pokemons.filter(
      poke => poke.name.toLowerCase().includes(search.toLowerCase())
    );

    return filtered.slice(currentPage, currentPage + 5);

  };

  const handleSearch = ({target}: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0);
    setSearch(target.value);
  };
 
  const handleNextPage = () => {
    if(pokemons.filter(
      poke => poke.name.toLowerCase().includes(search.toLowerCase())).length > currentPage + 5)
    setCurrentPage(currentPage + 5);
  };

  const handlePreviousPage = () => {
    if(currentPage > 0) 
    setCurrentPage(currentPage - 5);
  };


  return (
    <div className="mt-5">
        <h1>Listado de Pokemons</h1>
        <br />

        <input  
          type="text"
          className='mb-2 form-control'
          placeholder='Buscar Pokemon'
          value={search}
          onChange={handleSearch}
        />

        <button 
          className="btn btn-primary me-1" 
          onClick={handlePreviousPage}
        >
          Anteriores
        </button>

        <button 
          className="btn btn-primary" 
          onClick={handleNextPage}
        >
          Siguientes
          </button>

        <table className="table mt-5">
            <thead>
                <tr>
                    <th style={{width: 100}}>ID</th>
                    <th style={{width: 150}}>Nombre</th>
                    <th>Imagen</th>
                </tr>
            </thead>
            <tbody>
              {
                filteredPokemons().map( ({id, name, pic}) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>
                      <img src={pic} alt={name} width="75" />
                    </td>
                  </tr>
                ))
              }
            </tbody>
        </table>

        {isLoading && <Loading />}

    </div>
  )
}

export default HomePage