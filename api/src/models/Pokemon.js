const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "https://www.clipartmax.com/png/middle/129-1298328_pokeball-pokemon-ball-hd-images-free-png-image-pokebola-png.png"
    },
    hp: { //vida
      type: DataTypes.INTEGER
    },
    attack: { //fuerza
      type: DataTypes.INTEGER
    },
    defense: {
      type: DataTypes.INTEGER
    },
    speed: {
      type: DataTypes.INTEGER
    },
    heigth: { //altura
      type: DataTypes.INTEGER
    },
    weigth: {//peso
      type: DataTypes.INTEGER
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  });
};
