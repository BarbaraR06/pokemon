const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon_type', {
    pokemon_id: {
      type: DataTypes.UUID,
      references: {
        model: 'pokemons',
        key: 'id'
      }
    },
    type_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'types',
        key: 'id'
      }
    },
  });
};