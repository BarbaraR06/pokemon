const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {

  sequelize.define('Pokemon', {
    
    id: {
      type: DataTypes.UUID, //para que genere un ID único
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    imagen: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    vida: { 
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    fuerza: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }, 

    defensa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    velocidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    altura: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    peso: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

  },

  {
    timestamps: false,
    freezeTableName: true,
  }
  
  );
};