const { Router } = require('express');
const pokemonRouter = require("./pokemon.js");
const typeRouter = require("./type.js");

const router = Router();



router.use("/pokemon", pokemonRouter);
router.use("/type", typeRouter);

module.exports = router;

