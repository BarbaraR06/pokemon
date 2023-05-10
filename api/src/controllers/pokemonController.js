const axios = require('axios');
const {Pokemon,Type} = require('../db');
const {API_POKEMON} = require('../utils/globals');



const getPokeapi = async () => { 
    try {
        const pokemonsRequest = await axios.get(API_POKEMON);
        
        const pokemonsSubrequest = pokemonsRequest.data.results.map(obj => axios.get(obj.url));
        
        const infoUrlPokemons = await axios.all(pokemonsSubrequest);

        let pokemons = infoUrlPokemons.map(obj => obj.data);

        let informacionPokemons = pokemons.map(pokemon => objPokeApi(pokemon))
        return informacionPokemons

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
        altura: poke.height,
        peso: poke.weight,
        image: poke.sprites.other.dream_world.front_default,
        type: poke.types.length < 2 ? [poke.types[0].type.name] : [poke.types[0].type.name, poke.types[1].type.name],
    };
    return objPokeapi
};




const getPokedb = async () => {

    const pokemonDb = await Pokemon.findAll({
        include: Type
    });

    const objPokeDb = pokemonDb.map(pokemonDb => {
        return {
            id: pokemonDb.dataValues.id,
            nombre: pokemonDb.dataValues.nombre,
            vida: pokemonDb.dataValues.vida,
            ataque: pokemonDb.dataValues.fuerza,
            defensa: pokemonDb.dataValues.defensa,
            velocidad: pokemonDb.dataValues.velocidad,
            peso: pokemonDb.dataValues.altura,
            altura: pokemonDb.dataValues.peso,
            image: pokemonDb.dataValues.imagen,
            type: pokemonDb.dataValues.types?.map(e => e.nombre),
            createdInDb: pokemonDb.dataValues.createdInDb
        };
    })

    try {
        return objPokeDb
    } catch (err) {
        console.log(err);
    }
}


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
    getAllPoke
}