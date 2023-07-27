import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Card.css';

//Card renderiza lo que necesito

export default function Card({image, name, types, id}) {
    let stringTypes = "";
    if(types) {
        Array.isArray(types)
        ? (stringTypes = types.map((e) => e.name).toString())
        : (stringTypes = types)
    }


    return (
        <div className='card-container'>
            <img className='image' src={image} alt='Pokemon' width='170px' height='180px'/>
            <div className='card-detail'>
                <h5 className='name-title'>Name</h5>
                <h3>{name}</h3>
                <h5 className='type-title'>Types</h5>
                <h4>{stringTypes}</h4>
                {/* <h4>{types.map(t => t.name + " ")}</h4> */}
                {/* {
                    types.map((t, i) => (
                        <h4 key={i}>{t.name}</h4>
                    ))
                } */}
                <Link className='btn-detail' to={"/pokemons/" + id}>Detail</Link>
            </div>
        </div>
    )
}