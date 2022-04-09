import React from 'react';

export default function Paginado({pokemonsPerPage, allPokemons, paginado}) {
    const pageNumbers = [];
    //Math.ceil redondea para arriba
    for( let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i ++) {
        pageNumbers.push(i);
    }

    //renderizo cada numerito del paginado
    return (
        <nav>
                {
                    pageNumbers && pageNumbers.map(number => (
                            <button key={number} onClick={() => paginado(number)}>{number}</button>
                    ))
                }
        </nav>
    )
}