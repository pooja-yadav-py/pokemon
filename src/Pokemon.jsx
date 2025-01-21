import { useEffect, useState } from 'react';
import { PokemonCard } from './PokemonCard';
import './index.css';
export const Pokemon = () =>{
    const [pokemon,setPokemon] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    const [search,setSearch] = useState('')


    const API = "https://pokeapi.co/api/v2/pokemon?limit=24";

    const fetchPokemon = async () =>{
        try{
            const res = await fetch(API);
            const data = await res.json();
            const pokemonData =  data.results.map(async (currPokemon) => {
                const res = await fetch(currPokemon.url);
                const pokemonRes = await res.json()
                
                return pokemonRes;
                
            })
            const detailedPokemonResponse  = await Promise.all(pokemonData);
            console.log(detailedPokemonResponse);
            setPokemon(detailedPokemonResponse);
            setLoading(false)
        }catch(error)
        {
            setLoading(false);
            setError(error)
        }
    }
    useEffect(()=>{

        fetchPokemon();
    },[])

    // search 
    const searchData = pokemon.filter((curPokemon)=> curPokemon.name.toLowerCase().includes(search.toLowerCase()))

    if(loading){
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    if(error){
        return (
            <div>
                <h1>{error.message}</h1>
            </div>
        )
    }
    return(
        <>
            <section className='container'>
                <header >
                    <h1>Lets Catch Pokemon</h1>
                </header>
                <div className='pokemon-search'>
                    <input type='text' placeholder='search pokemon...' value={search} onChange={(e)=>setSearch(e.target.value)}/>
                </div>
                <div>
                    <ul className='cards'>
                        {
                            searchData.map((currentPokemon)=>{
                                return <PokemonCard key={currentPokemon.id} data ={currentPokemon}/>                                
                            })
                        }
                    </ul>
                </div>
            </section>
        </>
    )
}