const axios = require('axios');
const {Pokemon,Type} = require('../db');
const {API_POKEMON} = require('../utils/globales');


// 1 TRAE TODOS LOS OBJETOS DE LA API DE A CUANTO SEA QUE LOS LLAME DESDE LA URL
const getPokeapi = async () => { //Llamado doble a la api y a su suburl para traer todos los datos
    try {
        const pokemonsRequest = await axios.get(API_POKEMON);
        //me devuelve los pokemons traidos con un name y una url de cada pokemon
        const pokemonsSubrequest = pokemonsRequest.data.results.map(obj => axios.get(obj.url));
        //hago el axios pero a la sub url TERMINAR DE VER COMO FUNCIONA EL data.results.map
        const infoUrlPokemons = await axios.all(pokemonsSubrequest);
        //llama a todas las sub url, solicitudes simultaneas 
        let pokemons = infoUrlPokemons.map(obj => obj.data);
        //obtengo la data de cada pokemon por su suburl
        let informacionPokemons = pokemons.map(pokemon => objPokeApi(pokemon))
        return informacionPokemons

    } catch (error) {
        console.log(error);
        return error;
    }
};
const objPokeApi = (poke) => { // Con la informacion de los pokemons traída en informacionPokemons se creán objetos de Pokemones

    const objPokeapi = {
        id: poke.id,
        nombre: poke.name,
        vida: poke.stats[0].base_stat,
        ataque: poke.stats[1].base_stat,
        defensa: poke.stats[2].base_stat,
        velocidad: poke.stats[5].base_stat,
        altura: poke.altura,
        peso: poke.peso,
        imagen: poke.sprites.other.dream_world.front_default,
        types: poke.types.length < 2 ? [poke.types[0].type.name] : [poke.types[0].type.name, poke.types[1].type.name],
    };
    return objPokeapi
};

// 2 TRAE LOS POKEMONES DE LA BASE DE DATOS
const getPokedb = async () => {

    const pokemonDb = await Pokemon.findAll({
        include: Type
    });

    const objPokeDb = pokemonDb.map(pokemonDb => {
        return {
            id: pokemonDb.dataValues.id,
            name: pokemonDb.dataValues.nombre,
            life: pokemonDb.dataValues.vida,
            ataque: pokemonDb.dataValues.fuerza,
            defensa: pokemonDb.dataValues.defensa,
            velocidad: pokemonDb.dataValues.velocidad,
            altura: pokemonDb.dataValues.altura,
            peso: pokemonDb.dataValues.peso,
            imagen: pokemonDb.dataValues.imagen,
            types: pokemonDb.dataValues.types?.map(e => e.nombre),
            createdInDb: pokemonDb.dataValues.createdInDb
        };
    })

    try {
        return objPokeDb
    } catch (err) {
        console.log(err);
    }
}


// 3 UNION DE TODOS LOS POKEMONES DE API Y BASE DE DATOS
//me permite unir el array que me devuelve la pokeapi (40) pokemons + los pokemons creados en la DB pokemons


const getAllPoke = async () => {
    try {
        const apiPokeData = await getPokeapi();
        const dbPokeData = await getPokedb();
        return [...apiPokeData, ...dbPokeData];

    } catch (error) {
        console.log(error);
        return error;
    }
};


module.exports = {
    getAllPoke,
}