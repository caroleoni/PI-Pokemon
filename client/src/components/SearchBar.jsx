import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNamePokemons } from '../actions/index';
import '../styles/SearchBar.css';

export default function SearchBar() {
    const dispatch = useDispatch();
    const pokemons = useSelector((state) => state.pokemons)
    const [name, setName] = useState('');

function handleInputName(e) {
    e.preventDefault();
    setName('')
    setName(e.target.value.toLowerCase());
    
};
function handleSubmit(e) {
    e.preventDefault();
    const poke = pokemons.filter(p => p.name.toLowerCase().includes(name.toLowerCase()))
    if(!poke.length) {
        alert('Name not found')
        setName('')
        document.getElementById('search').value=''
    } else if(name.length > 0) {
        dispatch(getNamePokemons(name))
        setName('')
        document.getElementById('search').value=''
    } else {
        alert('Write a Pokemon')
    }
    
}

    return (
        <div className='searchName'>
            <input id='search' type='text' placeholder='Search Pokemon...' autoComplete='off' onChange={(e) => handleInputName(e)} />
            <button className='btn_search' type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}