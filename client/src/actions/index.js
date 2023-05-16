//las acciones describen que algo pasó
//la única forma de modificar un estado es emitiendo una acción, es un obj que describe un suceso
// solo ingresa al store si es enviada mediante la funcion dispatch



import axios from 'axios';



// UNION ENTRE BACK Y FRONT 
//TRAE LOS POKEMONES DE LA API
export function getPokemons(){
    return async function(dispatch){
        const pokeDex = await axios.get("/pokemons");
        //TRAE TODOS LOS POKEMONES AL HOME CON SUS TIPOS E IMAGENES
        return dispatch({
            type: 'GET_POKEMONS', //type: describe lo que queremos hacer
            payload: pokeDex.data 
        })        
    }
}



//TRAE TODOS LOS TIPOS DE POKEMONES
// para los filtros
export function getTypes() {
    return async function (dispatch) {
      const info = await axios.get('/types');
        return dispatch({ type: "GET_TYPES",  payload: info.data });
    };
}

//CREACION DE NUEVO POKEMON
export function postPokemon(payload) {
    return async function(dispatch){
        const responseCreated = await axios.post("/pokemons",payload)
        console.log(responseCreated)
        return responseCreated;
    }
}  

// ORDENA POR ORDEN ALFABETICO
// para los filtros
export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
} 

//FILTRA POR CREADOS EN API O BASE DE DATOS
// para los filtros
export function filterCreated(payload){
    return{
        type: 'FILTER_CREATED',
        payload
    }
}  

//ORDENA POR FUERZA DE ATAQUE
// para los filtros
export function orderByAttack(payload) {
    return {
        type: 'ORDER_BY_ATTACK',
        payload
    }
}

//BUSQUEDA POR NOMBRE
// para los filtros
export function getNamePokemons(name){
    return async function (dispatch){
        try{
            let json = await axios.get("/pokemons/pokemon/" + name);
                return dispatch({
                    type: "GET_NAME_POKEMONS",
                    payload: json.data
                })
        } catch(error){
            console.log(error)
        }
    }
}

//OBTENER DETALLES, 
//para la Card de Pokemon
export function getDetail(id) {
    
        return async function(dispatch) {
        try {
            let json = await axios.get("/pokemons/"+id);
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function filterType(payload) {
    return {
        type: 'FILTER_BY_TYPE',
        payload
    }
}