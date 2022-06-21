import { 
        GET_POKEMONS,
        GET_TYPES,
        FILTER_TYPES,
        FILTER_CREATED,
        ORDER_BY_NAME,
        ORDER_ATTACK,
        GET_NAME_POKEMONS,
        POST_POKEMON,
        DELETE_POKEMON,
        GET_DETAILS,
        RESET
    } from '../actions'

const initialState = {
    pokemons: [],
    pokemonsAux: [],
    types: [],
    details: []
};


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                pokemonsAux: action.payload
            };
        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            };
        case FILTER_TYPES:
            let allTypes = state.pokemonsAux;
            let typesFilter = action.payload === 'allTypes' ? allTypes : allTypes.filter(e => e.types.includes(action.payload));
            console.log(typesFilter)
            return {
                ...state,
                pokemons: typesFilter.length ? typesFilter : [`${action.payload} Pokemons`]
            };
            // const allTypes = state.pokemonsAux;
            // const typesFilter = action.payload === 'allTypes' ? allTypes : allTypes.filter(pokemon => {
            //     for(let types of pokemon.types){
            //         if(action.payload === types){
            //             return pokemon
            //         } 
            //     }
            // });
            // return {
            //     ...state,
            //     pokemons: typesFilter
            // };
            // let allTypes = state.pokemonsAux;
            // let typesFilter = [];
            // if(action.payload === 'allTypes') {
            //     typesFilter = allTypes;
            // } else {
            //     typesFilter = allTypes.filter(e => e.types.includes(action.payload));
            // }
            // if(typesFilter.length > 0) {
            //     return {...state, pokemons: typesFilter};
            // } else {
            //     return {...state, pokemons: 'Not Found'};
            // };
        case FILTER_CREATED:
            const allPokemons = state.pokemonsAux;
            const filterCreated = action.payload === 'create' ? allPokemons.filter(e => e.createdInDb) : allPokemons.filter(e => !e.createdInDb);
            return {
                ...state,
                pokemons: action.payload === 'all' ? allPokemons : filterCreated
            };
        case ORDER_BY_NAME: 
            const orderName = action.payload === 'A-Z' ?
            state.pokemons.sort(function(a, b)  {
                if(a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                }
                if(b.name.toLowerCase() > a.name.toLowerCase()) {
                    return -1;
                }
                return 0;
            }) : 
            state.pokemons.sort(function(a, b) {
                if(a.name.toLowerCase() > b.name.toLowerCase()) {
                    return -1;
                }
                if(b.name.toLowerCase() > a.name.toLowerCase()) {
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                pokemons: orderName
            };
        case ORDER_ATTACK:
            const orderAttack = action.payload === 'higher' ?
            state.pokemons.sort(function(a, b) {
                return b.attack - a.attack;
            }) :
            state.pokemons.sort(function(a, b) {
                return a.attack - b.attack;
            });
            return {
                ...state,
                pokemons: orderAttack
            };
        case GET_NAME_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                pokemonsAux: action.payload
            };
        case GET_DETAILS:
            return {
                ...state,
                details: action.payload
            };  
        case POST_POKEMON:
            return {
                ...state
            };
        case DELETE_POKEMON:
            return {
                ...state,
                // pokemons: state.pokemons.filter(e => e.id !== id)
            };
        case RESET: 
            return {
                ...state,
                details: []
            };   
    
        default:
           return state;
    }
}



export default rootReducer;