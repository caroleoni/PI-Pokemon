import React from 'react';
import '../styles/Paginado.css';

export default function Paginado({pokemonsPerPage, allPokemons, paginado}) {
    const pageNumbers = [];
    //Math.ceil redondea para arriba
    for( let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i ++) {
        pageNumbers.push(i);
    }

    //renderizo cada numerito del paginado
    return (
        <nav className='paginado'>
                {
                    pageNumbers && pageNumbers.map(number => (
                            <button className='btn_buttton' key={number} onClick={() => paginado(number)}>{number}</button>
                    ))
                }
        </nav>
    )
}