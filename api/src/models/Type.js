const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define( 'Type',
    {
      nombre: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    id: {
      type: DataTypes.UUID, //para que genere un ID único
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
}, {
    timestamps: false,
    freezeTableName: true,
})
};