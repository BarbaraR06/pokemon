const {Router} = require('express')
const {getAllPoke} = require('../controllers/pokemonController.js');
const { Pokemon, Type} = require('../db')

const router = Router()

// 1 TRAE TODOS LOS POKEMONES DE BASE DE DATOS Y DE API CON EL LLAMADO HTTP
//UTILIZANDO LA FUNCION getAllPoke traída de pokemonController

router.get('/', async (req, res) => {
    try {

        return res.status(200).send(await getAllPoke());

    } catch (error) {
        return res.status(404).send('Pokemon no encontrado');
    }
});

// router.post('/', async (req, res) => {
//     const { nombre, vida, fuerza, defensa, velocidad, altura, peso } = req.body;
//     const newPokemon = await createPokemon(nombre, vida, fuerza, defensa, velocidad, altura, peso);
//     res.status(200).json(newPokemon);
//   });



//BUSCA LOS POKEMONS POR SUS ID PRIMERO LLAMANDO A LA FUNCION getAllPoke
//LUEGO FILTRA EL OBJETO CREADO A PARTIR DE LA FUNCION POR SUS ID

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const allPokemons = await getAllPoke();
    try {
        if (id) {
            const pokemonId = await allPokemons.filter(e => e.id == id);
            pokemonId.length 
                ? res.status(200).json(pokemonId) 
                : res.status(404).send('Pokemon no encontrado')
        }
    } catch (error) {
        console.log(error);
    }
})

//BUSCA LOS POKEMONS POR SUS ID PRIMERO LLAMANDO A LA FUNCION getAllPoke
//LUEGO FILTRA EL OBJETO CREADO A PARTIR DE LA FUNCION POR SUS NAME

router.get('/pokemon/:name', async (req, res) => {
    const { name } = req.params;
    const allPokemons = await getAllPoke();
    try {
        if (name) {
            const pokemonName = await allPokemons.filter(e => e.name == name);
            pokemonName.length ?
                res.status(200).json(pokemonName) :
                res.status(404).send('Pokemon no encontrado')
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
    } = req.body 
    const newPokemon = await Pokemon.create({
        nombre,
        vida,
        fuerza,
        defensa,
        velocidad,
        altura,
        peso,
        imagen,
        createdInDb
    }) 

    const tipoDb = await Type.findAll({
        where: {
            nombre: type
        }
    }) 
    newPokemon.addType(tipoDb)
    res.status(200).json('pokemon creado')

})



module.exports = router;