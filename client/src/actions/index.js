import axios from 'axios';

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_TYPES = 'GET_TYPES';
//EN LA ACCION ES SIMPLEMENTE DESPACHAR UN TIPO, NO HAY QUE HACER LOGICA , SIEMPRE HACERLA EN REDUCER O EN COMPONENTE
//A LA LOGICA

//conexion entre back y el front
export function getPokemons() {
    return async function(dispatch) {
        console.log(dispatch)
        let json = await axios.get('http://localhost:3001/pokemons');
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data
        });
    }
};
export function getTypes() {
    return async function(dispatch) {
        let json= await axios.get('http://localhost:3001/types');
        return dispatch({
            type: 'GET_TYPES',
            payload: json.data
        });
    }
};



