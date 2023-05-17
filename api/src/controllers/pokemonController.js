const axios = require('axios');
const { Pokemons, Types } = require('../db');
const { API_POKEMON } = require('../utils/globales');


// 1 TRAE TODOS LOS OBJETOS DE LA API DE A CUANTO SEA QUE LOS LLAME DESDE LA URL

const getPokeapi = async () => {
    try {
        const pokemonsRequest = await axios.get(API_POKEMON);
        const pokemonsSubrequest = pokemonsRequest?.data.results.map(obj => axios.get(obj.url));
        const infoUrlPokemons = await axios.all(pokemonsSubrequest);
        const pokemons = infoUrlPokemons?.map(obj => obj.data);
        const informacionPokemons = pokemons?.map(pokemon => objPokeApi(pokemon));
        return informacionPokemons;
    } catch (error) {
        console.log(error);
        return error;
    }
};

const objPokeApi = (poke) => {

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

    const pokemonDb = await Pokemons.findAll({
        include: Types
    });

    const objPokeDb = pokemonDb?.map(pokemonDb => {
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