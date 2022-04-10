import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNamePokemons } from '../actions/index';
import '../styles/SearchBar.css';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

function handleInputName(e) {
    e.preventDefault();
    setName('')
    setName(e.target.value.toLowerCase());
    
};
function handleSubmit(e) {
    e.preventDefault();
    if(name.length > 0) {
        dispatch(getNamePokemons(document.getElementById('search').value.toLowerCase()))
        setName('');
        document.getElementById('search').value=''
    } else {
        alert('Write a name')
    }
    
}

    return (
        <div className='searchName'>
            <input id='search' type='text' placeholder='Search Pokemon...' autoComplete='off' onChange={(e) => handleInputName(e)} />
            <button className='btn_search' type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}