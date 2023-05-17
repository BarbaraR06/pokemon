const {Router} = require('express');
const {getAllPoke} = require('../controllers/pokemonController');
const { Pokemon, Type} = require('../db');
const router = Router();
const { fetch } = require("cross-fetch");
// 1 TRAE TODOS LOS POKEMONES DE BASE DE DATOS Y DE API CON EL LLAMADO HTTP
//UTILIZANDO LA FUNCION getAllPoke traída de pokemonController

router.get('/', async (req, res) => {
    try {
     return res.status(200).send(await getAllPoke());
    } catch (error) {
        return res.status(404).send('Pokemon no encontrado');
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
                            //formater pokemonType
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
        return('Pokémon no encontrado');;
    }
});

//BUSCA LOS POKEMONS POR SUS ID PRIMERO LLAMANDO A LA FUNCION getAllPoke
//LUEGO FILTRA EL OBJETO CREADO A PARTIR DE LA FUNCION POR SUS NAME

router.get('/pokemons/:name', async (req, res) => {
    const { name } = req.params;
    const allPokemons = await getAllPoke();
    try {
        if (name) {
            const pokemonName = allPokemons.filter(e => e.name.toLowerCase() === name.toLowerCase());
            pokemonName 
            ? res.status(200).json(pokemonName) 
            : res.status(404).send('Pokemon not found')
        }
    } catch (error) {
        console.log(error);
    }
})

//POSTEO DE NUEVOS POKEMONES EN LA BASE DE DATOS

router.post('/', async (req, res) => {
    const {
        nombre,
        vida,
        fuerza,
        defensa,
        velocidad,
        altura,
        peso,
        imagen,
        createdInDb,
        type
    } = req.body //indica los parametros pertenecientes al body en el JSON

    let newPokemon = await Pokemon.create({
        nombre,
        vida,
        fuerza,
        defensa,
        velocidad,
        altura,
        peso,
        imagen,
        createdInDb
    },{ validate: true }) //creador del nuevo Pokemon en la base de datos

    let tipoDb = await Type.findAll({
        where: {
            nombre: type
        }
    }) //busca todos los tipos de pokemones en la base de datos

    newPokemon.addType(tipoDb)
    res.send('El pokemon ha sido creado con éxito')
})// agrega el tipo al nuevo pokemon

router.get('/', async (req, res) => {
    const query = req.query;
    const pageIndex = req.query.page_index ? Number(req.query.page_index) : 1;
    const pageSize = req.query.page_size ? Number(req.query.page_size) : 12;
  
    const pokemons = await utils.getPokemonsApi({ limit: pageSize, offset: (pageIndex - 1) * pageSize });
  
    return res.send(pokemons);
  });

module.exports = router;