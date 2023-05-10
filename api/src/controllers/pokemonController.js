const axios = require("axios");
const { parsePokemon, getPokemonTypesFromDb } = require("../utils/globals");
const { Pokemon } = require("../db");


//trae los pokemons de la db
const getPokemonData = async () => {
  try {
    const pokemonsInDb = await Pokemon.findAll();

    const pokemonsInDbCompletos = await Promise.all(
      pokemonsInDb.map(async (pokemonInDb) => {

        const pokemonTypes = await getPokemonTypesFromDb(pokemonInDb);
        
        const pokemonCompleto = {
          ...pokemonInDb.dataValues,
          types: pokemonTypes,
        };
        return pokemonCompleto;
      })
    );

    // api pokemons
    const pokemonPromises = [];
    let i = 1;

    while (i <= 10) {
      let apiData = await axios(`https://pokeapi.co/api/v2/pokemon/${i}`);
      pokemonPromises.push(apiData);
      i++;
    }

    const rawPokemons = (await Promise.all(pokemonPromises)).map(
      (response) => response.data
    );
    const parsedPokemons = rawPokemons.map((pokemon) => parsePokemon(pokemon));

    const allPokemons = [...pokemonsInDbCompletos, ...parsedPokemons];

    return allPokemons;
  } catch (error) {
    throw Error(error.message);
  }
};

//trae los pokemons por id
const getPokemonById = async (id) => {
    try {
      // api
      const rawPokemon = (await axios(`https://pokeapi.co/api/v2/pokemon/${id}`))
        .data;
      const pokemon = parsePokemon(rawPokemon);
      return pokemon;
    } catch (error) {
      return false;
    }
  };

  const getPokemonByName = async (name) => {
    try {
      const nameNormalized = name.toLowerCase();

      const pokemonInDb = await Pokemon.findOne({
        where: { name: nameNormalized },
      });
      if (pokemonInDb) {
        const pokemonTypes = await getPokemonTypesFromDb(pokemonInDb)
        console.log(pokemonTypes);
        return { ...pokemonInDb.dataValues, types: pokemonTypes };
      }
  
      // in api?
      const rawPokemon = (
        await axios(`https://pokeapi.co/api/v2/pokemon/${nameNormalized}`)
      ).data;
      const pokemon = parsePokemon(rawPokemon);
      return pokemon;
    } catch (error) {
      console.log(error.message);
    }
  };
  


module.exports = 
getPokemonData, 
getPokemonById,
getPokemonByName;
