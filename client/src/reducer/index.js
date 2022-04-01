import { 
        GET_POKEMONS,
        GET_TYPES
        
    } from '../actions'

const initialState = {
    pokemons: [],
    // pokemonsAux: [],
    types: []
};


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemon: action.payload,
                // pokemonsAux: action.payload
            }
        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }
            
    
        default:
           return state;
    }
}



export default rootReducer;