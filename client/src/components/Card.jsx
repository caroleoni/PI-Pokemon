import React from 'react';
import { Link } from 'react-router-dom';

//Card renderiza lo que necesito

export default function Card({image, name, types, id}) {
    return (
        <div className='card-container'>
            <img src={image} alt='image' width='170px' height='180px'/>
            <div className='card-detail'>
                <h5 className='name-title'>Name</h5>
                <h3>{name}</h3>
                <h5 className='type-title'>Types</h5>
                <h4>{types.map(t => t.name + " ")}</h4>
                <Link className='btn-detail' to={"/pokemons/" + id}>Detail</Link>
            </div>
        </div>
    )
}