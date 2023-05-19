//las acciones describen que algo pasó
//la única forma de modificar un estado es emitiendo una acción, es un obj que describe un suceso
// solo ingresa al store si es enviada mediante la funcion dispatch
import axios from 'axios';

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_DETAILS = "GET_DETAILS";
export const GET_TYPES = "GET_TYPES"; 
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const FILTER_CREATED = "FILTER_CREATED";
export const GET_NAME_POKEMONS = "GET_NAME_POKEMONS";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";




export function getPokemons(){
    return async function(dispatch){
        await fetch(`${process.env.REACT_APP_HOST_BACK}/pokemons`)
        //TRAE TODOS LOS POKEMONES AL HOME CON SUS TIPOS E IMAGENES
        .then(p=>p.json())
        .then((arrayFetch)=>{
            dispatch({
                type: 'GET_POKEMONS',
                payload: arrayFetch,
            })
        })
    }
}



//TRAE TODOS LOS TIPOS DE POKEMONES
// para los filtros
export function getTypes() {
    return async function (dispatch) {
        const info = await axios.get("/types");
        return dispatch({ 
            type: "GET_TYPES", 
            payload: info.data 
        });
    };
}

//CREACION DE NUEVO POKEMON
export function postPokemon(payload) {
    return async function(dispatch){
        const responseCreated = await axios.post("/pokemon",payload)
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

export function getNamePokemons(name){
    return async function (dispatch){
        try{
            let json = await axios.get(`/pokemons/pokemon/`+ name);
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