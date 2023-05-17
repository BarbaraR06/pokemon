const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    detail: [],
}

function rootReducer(state = initialState, action) { //el rootReducer sirve para combinar las funciones que genera el store

    switch (action.type) {
        //trae todos los pokemones
        case 'GET_POKEMONS':
            return {
                ...state, // crea una nueva copia del estado actual utilizando el '...state'
                pokemons: action.payload,
                allPokemons: action.payload, // payload: son los datos que pasa, puede ser un objeto, array, cadena de texto, números
                detail: [],
            }

        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload,
            }

        case 'POST_POKEMON':
            return {
                ...state,
            }

        case 'ORDER_BY_NAME':
            const sortedArr = action.payload === 'asc'
                ? state.pokemons.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                })
                : state.pokemons.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (a.name < b.name) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                pokemons: sortedArr
            }

        case 'FILTER_CREATED': //filtro de poke por API o por DB
            const createdFilter = action.payload === 'created'
             ? state.allPokemons.filter(el => el.createdInDb)
             : state.allPokemons.filter(el => !el.createdInDb)
            return {
                ...state, 
                pokemons: action.payload === 'all'
                ? state.allPokemons
                : createdFilter
            }

        case 'ORDER_BY_ATTACK':
            const sortedAttack = action.payload === 'strong'
            ? state.pokemons.sort (function (a,b){
                if (a.attack > b.attack){
                    return 1;
                }
                if (a.attack < b.attack){
                    return -1
                }
                return 0;
            })
            : state.allPokemons.sort (function (a,b){
                if (a.attack > b.attack){
                    return -1; 
                }
                if (a.attack < b.attack){
                    return 1;
                }
                return 0;
            })
            return {
                ...state, 
                pokemons: sortedAttack
            }
        case 'GET_NAME_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
            }

        case 'GET_DETAILS':
            return {
                ...state, 
                details: action.payload,
            }
            
        case 'FILTER_BY_TYPE':
            const pokemonByType = state.allPokemons
            const estadoFiltrado = action.payload === 'all'
            ? pokemonByType 
            : pokemonByType.filter ((event) => event.types.includes (action.payload))
            return {
                ...state,
                pokemons: estadoFiltrado,
            }
            default: return state;
    }

}

export default rootReducer;












































