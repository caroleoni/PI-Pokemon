import React from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getDetails, deletePokemon, reset} from '../actions';
import { useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Detail.css';

export default function Detail() {
    const dispatch = useDispatch(); //las va a ejecutar a las actions, reemplaza el connect
    const {id} = useParams();
    const navigate = useNavigate();

useEffect(() => {
    dispatch(reset())
}, [dispatch]);

useEffect(() => { //cuando se monta, actualiza el componente
    dispatch(getDetails(id))
  }, [dispatch, id]) //el array son las dependecias


function handleDelete() {
    dispatch(deletePokemon(id));
    navigate('/home')
};

const myPokemon = useSelector((state) => state.details);

return (
    <div className='container_detailsPrincipal'>
        {
            myPokemon.length > 0 ?
            <div className='details'>
                <h1>"{myPokemon[0].name.toUpperCase()}"</h1>
                <img src={myPokemon[0].image} alt='imagen' width='380px' height='450px' />

                <h3>HP: {myPokemon[0].hp}</h3>
                <h3>ATTACK: {myPokemon[0].attack}</h3>
                <h3>DEFENSE: {myPokemon[0].defense} </h3>
                <h3>SPEED: {myPokemon[0].speed} </h3>
                <h3>HEIGHT: {myPokemon[0].height} </h3>
                <h3>WEIGHT: {myPokemon[0].weight} </h3>
                {/* <h3>TYPES: {myPokemon[0].types.map((t => t + ' '))}</h3> */}
                <h3>TYPES:</h3>
                {/* Pregunto si el tipo es un array de los creados? si lo es  mapeo el array de objetos, sino
                me llega como string desde la api */}
                {
                    Array.isArray(myPokemon[0].types) ?
                    myPokemon[0].types.map((t,i)=>{
                    return <div key={i}>
                                <h3 key={i}> {t.name}</h3>
                           </div>
                  }): <h3>{ myPokemon[0].types}</h3>
                  
                }
                {
                    typeof myPokemon[0].id === 'string' && (
                        <button className='delete' onClick={handleDelete}>Delete Pokemon</button>
                    )
                }

                <div className='btn-detail'>
                    <Link to='/home'>
                        <button className='btn_Detail'>Home</button>
                    </Link>
                </div>
            </div>
            : <div className='loading'><h2>Loading....</h2></div>
        }
    </div>
)
};

