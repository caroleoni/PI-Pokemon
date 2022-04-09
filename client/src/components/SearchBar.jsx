import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNamePokemons } from '../actions/index';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

function handleInputName(e) {
    e.preventDefault();
    setName('')
    setName(e.target.value);
    
    
};
function handleSubmit(e) {
    e.preventDefault();
    if(name.length > 0) {
        dispatch(getNamePokemons(name))
        setName('');
        document.getElementById('search').value=''
    } else {
        alert('Write a name')
    }
    
}

    return (
        <div className='searchName'>
            <input id='search' type='text' placeholder='Search Pokemon...' onChange={(e) => handleInputName(e)} />
            <button type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}