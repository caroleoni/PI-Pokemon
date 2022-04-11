import axios from 'axios';

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_TYPES = 'GET_TYPES';
export const FILTER_TYPES = 'FILTER_TYPES';
export const FILTER_CREATED = 'FILTER_CREATED';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_ATTACK = 'ORDER_ATTACK';
export const GET_NAME_POKEMONS = 'GET_NAME_POKEMONS';
export const POST_POKEMON = 'POST_POKEMON';
export const DELETE_POKEMON = 'DELETE_POKEMON';
export const GET_DETAILS = 'GET_DETAILS';
export const RESET = 'RESET';
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
        console.log(json.data)
        return dispatch({
            type: 'GET_TYPES',
            payload: json.data
        });
    }
};
export function getNamePokemons(name) {
    return async function(dispatch) {
        try {
            const json = await axios.get('http://localhost:3001/pokemons?name=' + name);
            console.log(json)
            return dispatch({
                type: 'GET_NAME_POKEMONS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
            return dispatch({
                type: 'GET_NAME_POKEMONS',
                payload: []
            })
        }
    }
};
export function postPokemon(payload) {
    return async function(dispatch) {
        const response = await axios.post('http://localhost:3001/pokemons', payload);
        console.log(response)
        return dispatch({
            type: 'POST_POKEMON',
            payload: response
        })
    }
};
export function getDetails(id) {
    return async function(dispatch) {
        try {
            let json = await axios.get('http://localhost:3001/pokemons/' + id);
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}    
export function filterByTypes(payload) {
    return {
        type: 'FILTER_TYPES',
        payload
    }
};
export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
};
export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
};
export function orderAttack(payload) {
    return {
        type: 'ORDER_ATTACK',
        payload
    }
};
export function deletePokemon(id) {
    return async function(dispatch) {
       await axios.delete('http://localhost:3001/pokemons/' + id)
        return dispatch({
            type: 'DELETE_POKEMON',
        
        })
    }
};
export function reset() {
    return {
        type: 'RESET'
    }
};

