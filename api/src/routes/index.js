const { Router } = require('express');
const pokemonsRoutes = require("./pokemon");
const typesRoutes = require("./type");
const express = require("express");
const morgan = require("morgan");

const router = Router();

router.use(morgan("dev"));
router.use(express.json());

//----- Routes Config -----

router.use("/pokemons", pokemonsRoutes);
router.use("/types", typesRoutes);


module.exports = router;