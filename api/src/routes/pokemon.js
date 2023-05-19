const { Router } = require('express');
const { Pokemon, Type } = require('../db');
const router = Router();
const { fetch } = require("cross-fetch");
const {getAllPoke} = require('../controllers/pokemonController');
// 1 TRAE TODOS LOS POKEMONES DE BASE DE DATOS Y DE API CON EL LLAMADO HTTP
//UTILIZANDO LA FUNCION getAllPoke traída de pokemonController


router.get('/', async (req, res) => {
  try {
    return res.status(200).send(await getAllPoke());
  } catch (error) {
    console.log('entro error');
    return res.status(404).send('Pokemons not found');
  }
});



router.get("/:name", async (req, res, next) => {
    try {
      const { name } = req.params;
      const lowercaseName = name.toLowerCase();
  
      // Buscar en la API externa
      const searchApi = await fetch(`https://pokeapi.co/api/v2/pokemon/${lowercaseName}`)
        .then((response) => {
          if (response.status !== 404) {
            return response.json();
          } else {
            return null; // Cambio: Devuelve null cuando no se encuentra en la API
          }
        })
        .then((pokemonData) => {
          if (pokemonData && pokemonData.name) {
            let typesString = "";
            pokemonData.types.forEach((t, index) => {
              typesString = typesString + t.type.name + " ";
            });
            pokemonData.name = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
  
            return {
              pokemonType: typesString,
              hp: pokemonData.stats[0].base_stat,
              defense: pokemonData.stats[2].base_stat,
              attack: pokemonData.stats[1].base_stat,
              speed: pokemonData.stats[5].base_stat,
              weight: pokemonData.weight,
              height: pokemonData.height,
              image: pokemonData.sprites.other.dream_world.front_default,
              name: pokemonData.name,
              id: pokemonData.id,
            };
          }
          return null; // Cambio: Devuelve null cuando no se encuentra en la API
        });
  
      // Buscar en la base de datos
      const searchDb = await Pokemon.findAll()
        .then((db) => {
          if (db === null || db === undefined) {
            db = [];
          }
          return db;
        })
        .then((dbData) => {
          let newSearch = dbData.map((pokemon) => {
            let string = "";
            let array = pokemon.pokemonType.split(",");
            array.forEach((t) => {
              string = string + t + " ";
            });
            pokemon.pokemonType = string;
  
            if (pokemon.name.toLowerCase() === lowercaseName) {
              return pokemon;
            }
            return null; // Cambio: Devuelve null cuando no se encuentra en la base de datos
          });
          return newSearch;
        });
  
      const fullArray = searchDb.concat(searchApi).filter((el) => el != null);
  
      if (fullArray.length > 0) {
        res.send(fullArray);
      } else {
        res.status(404).send("Pokémon no encontrado");
      }
    } catch (err) {
      next(err);
    }
  });

//BUSCA LOS POKEMONS POR SUS ID PRIMERO LLAMANDO A LA FUNCION getAllPoke
//LUEGO FILTRA EL OBJETO CREADO A PARTIR DE LA FUNCION POR SUS ID

router.get("/:id", async (req, res, next) => {
    try {
        let id = req.params.id;
        //  console.log(id)
        if (id.length < 5) {
            let info = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(info => info.json());

            let typesString = "";
            info.types.forEach((t) => {
                typesString = typesString + t.type.name + " "
            })

            info.name = info.name.charAt(0).toUpperCase() + info.name.slice(1)

            return res.send({
                tipo: typesString,
                vida: info.stats[0].base_stat,
                defensa: info.stats[2].base_stat,
                ataque: info.stats[1].base_stat,
                velocidad: info.stats[5].base_stat,
                peso: info.weight,
                altura: info.height,
                imagen: info.sprites.other.dream_world.front_default,
                nombre: info.name,
                id: info.id,
            })
        } else { //busca en la DB
            let searchDb = await Pokemon?.findAll().then((db) => {
                if (db === null || db === undefined) { db = [] }
                return db
            }).then((a) => {
                if (a !== []) {
                    // console.log(a)
                    let newSearch = a.map((a) => {
                        if (a.id === id) {
                            let string = ""
                            let array = a.pokemonType.split(',')
                            array.forEach(t => {
                                string = string + t + " "
                            })
                            a.pokemonType = string;
                            return a
                        }
                        return undefined
                    })
                    return newSearch
                }
            })
            searchDb = searchDb.filter(a => (a !== null && a !== undefined && a !== []))
            res.send(searchDb)
        }
    } catch (error) {
        return ('Pokémon no encontrado');;
    }
});

//BUSCA LOS POKEMONS POR SUS ID PRIMERO LLAMANDO A LA FUNCION getAllPoke
//LUEGO FILTRA EL OBJETO CREADO A PARTIR DE LA FUNCION POR SUS NAME

//POSTEO DE NUEVOS POKEMONES EN LA BASE DE DATOS

router.post("/", async (req, res, next) => {
  try {
    let {
      name,
      hp,
      attack,
      defense,
      speed,
      weight,
      height,
      pokemonType,
      image,
    } = req.body;

    name = name.charAt(0).toUpperCase() + name.slice(1)

    const exist = await Pokemon.findOne({ where: { name: name } });
    if (exist) return res.status(300).json({ info:  `${name} already Exists in DB` });

    await fetch(`${process.env.REACT_APP_HOST_BACK}/types`);
    let newPokemon = await Pokemon.create({
      name: name,
      hp: hp,
      attack: attack,
      defense: defense,
      speed: speed,
      weight: weight,
      height: height,
      pokemonType: pokemonType,
      image: image,
    });
    let pokemonTypes = pokemonType.split(", ");
    pokemonTypes.forEach(async (typ) => {
      let typeSearch = await Type.findOne({
        where: {
          name: typ,
        },
      });

      let relationship = newPokemon.addType(typeSearch);
    });
    res.status(200).send(newPokemon);
  } catch (err) {
    next(err);
  }
});



module.exports = router;