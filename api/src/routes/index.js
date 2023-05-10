const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonsRoutes = require("./pokemon");
const typesRoutes = require("./type");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//----- Routes Config -----
router.use("/pokemons", pokemonsRoutes);
router.use("/types", typesRoutes);

module.exports = router;