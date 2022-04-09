import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getTypes, filterCreated , filterByTypes, orderByName, orderAttack} from '../actions';
import { Link } from 'react-router-dom';
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    const types = useSelector((state) => state.types)
   
    const [currentPage, setCurrentPage] = useState(1);
    //pokemons que tengo por pagina
    const [pokemonsPerPage, /*setPokemonsPerPage*/] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonsPerPage; //12
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage; //0
    //tiene los pokemones que estan en la pagina actual, el slice divide un arrar dependiendo de lo que le este pasando
    //por parametro
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber); //seteo la pagina en este numero de pagina que le pase por parametro
    };
    const [/*order*/, setOrder] = useState(' ');


    useEffect(() => {
        dispatch(getPokemons())
    }, [dispatch]);
    
    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch]);
    

function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons())
}
function handleFilterByTypes(e) {
    e.preventDefault();
    dispatch(filterByTypes(e.target.value))
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
}
function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value))
}
function handleOrderByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
}
function handleOrderAttack(e) {
    e.preventDefault();
    dispatch(orderAttack(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`)
}
    
   return (
       <div className='container'>
           <nav>
                <div className='navbar_container'>
                    <div className='titulo_pagPrincipal'>
                        <h1>Pokemon App</h1>
                    </div>
                    <SearchBar/>
                    <div>
                        <label className="navbar_label">Order by:</label>
                        <select onChange={(e) => handleOrderByName(e) } defaultValue='Order'>
                            <option className='navbar_option' disabled>Order</option>
                            <option className='navbar_option' value='A-Z'>A to Z</option>
                            <option className='navbar_option' value='Z-A'>Z to A</option>
                        </select>

                        <select onChange={(e) => handleOrderAttack(e)} defaultValue='Strong'>
                            <option className='navbar_option' disabled>Strong</option>
                            <option className='navbar_option' value='lower'>Lower Attack</option>
                            <option className='navbar_option'value='higher'>Higher Attack</option>
                        </select>
                    </div>
                    <div>
                        <label className="navbar_label">Filter by:</label>
                        <select onChange={(e) => handleFilterCreated(e)}>
                            <option className='navbar_option' value='all'>Created by:</option>
                            <option className='navbar_option' value='api'>Api</option>
                            <option className='navbar_option' value='create'>Created</option>
                        </select>
                        <select onChange={(e) => handleFilterByTypes(e)} defaultValue='Types'>
                            <option className='navbar_option' disabled>Types:</option>
                            <option className='navbar_option' value='allTypes'>All Types</option>
                            {
                                types && types.map((t) => (
                                    <option className='navbar_option' value={t.name} key={t.id}>{t.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='link_createForm'>
                        <Link to='/pokemons'><button>Create your own pokemon</button></Link>
                    </div>
                    <div className='btn_reset'>
                        <button onClick={(e) => handleClick(e)}>Home</button>
                    </div>
                </div>
            </nav>
            <div className='paginado'>
            {/* esto son las props que necesita el paginado para funcionar */}
            <Paginado 
                pokemonsPerPage = {pokemonsPerPage} //personaje por pagina
                allPokemons = {allPokemons.length} //necesito un valor numerico
                paginado = {paginado}
            />
            </div>

            <div className='cards'>
                 {
                    currentPokemons.length > 0 ? currentPokemons.map((p) => {
                        return (
                            <Card 
                                image={p.image}
                                name={p.name}
                                types={p.types}
                                id={p.id}
                                key={p.id}                            
                            />
                        )
                    }) : <p>Loading...</p>
                    
                } 
                
            </div>
       </div>
       
   ) 

}