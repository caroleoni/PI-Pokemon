import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getTypes } from '../actions';
import { Link } from 'react-router-dom';
import Card from "./Card";

export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    const types = useSelector((state) => state.types)
   
    // const [currentPage, setCurrentPage] = useState(1);
    // //cuantos pokemons tengo por pagina
    // const [pokemonPerPage, setPokemonsPerPage] = useState()



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

    
   return (
       <div className='container'>
           <nav>
                <div className='navbar_container'>
                    <div className='titulo_pagPrincipal'>
                        <h1>Pokemon App</h1>
                    </div>
                    <div>
                        <label className="navbar_label">Order by:</label>
                        <select>
                            <option className='navbar_option'>A to Z</option>
                            <option className='navbar_option'>Z to A</option>
                        </select>

                        <select>
                            <option className='navbar_option'>Lower Attack</option>
                            <option className='navbar_option'>Higher Attack</option>
                        </select>
                    </div>
                    <div>
                        <label className="navbar_label">Filter by:</label>
                        <select>
                            <option className='navbar_option' value='All'>Created by:</option>
                            <option className='navbar_option' value='Api'>Api</option>
                            <option className='navbar_option' value='create'>Created</option>
                        </select>
                        <select>
                            <option className='navbar_option' value='Types'>Types:</option>
                            <option className='navbar_option' value='All_Types'>All Types:</option>
                            {
                                types && types.map((t) => (
                                    <option className='navbar_option' value={t.name} key={t.id}>{t.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='link_createForm'>
                        <Link to='/pokemons'>Create your own pokemon</Link>
                    </div>
                    <div className='btn_reset'>
                        <button onClick={(e) => handleClick(e)}>Home</button>
                    </div>
                </div>
            </nav>

            <div className='cards'>
                {
                    allPokemons ? allPokemons.map((p) => {
                        return (
                            <Card 
                                image={p.imagen}
                                name={p.name}
                                types={p.types}
                                id={p.id}
                                key={p.key}                            
                            />
                        );
                    }) : <h1>No hya pokemons</h1>
                    
                }
                 {/* : <div>
                            <img src={loading} alt='Loading...' />
                            <br />
                            <h1>Loading...</h1>
                        </div> */}
            </div>
       </div>
       
   ) 

}