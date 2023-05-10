const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonsRoutes = require("./pokemon.js");
const typesRoutes = require("./type.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use("/pokemons", pokemonsRoutes);
router.use("/types", typesRoutes);

module.exports = router;

