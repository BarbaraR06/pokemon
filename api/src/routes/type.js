
const { Router } = require("express");

const { fetch } = require("cross-fetch");
const router = Router()

router.get("/", async (req, res, next) => {
    try {
      let typesArray = [];
  
      const response = await fetch("https://pokeapi.co/api/v2/type");
      const data = await response.json();
  
      for (const type of data.results) {
        typesArray.push({
          name: type.name,
          id: extractTypeId(type.url),
        });
  
        // Puedes utilizar Type.findOrCreate o cualquier otra lógica de almacenamiento en tu base de datos aquí
      }
  
      res.json(typesArray);
    } catch (error) {
      next(error);
    }
  });
  

  //Saca el id de cada type de pokemon
  function extractTypeId(url) {
    const parts = url.split("/");
    return parts[parts.length - 2];
  }
  
  module.exports = router;