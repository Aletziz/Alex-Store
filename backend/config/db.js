const { Sequelize } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../database/store.sqlite"),
  logging: false,
  define: {
    freezeTableName: true,
  },
});

// Asegurarse de que la base de datos se sincronice sin eliminar datos existentes
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Base de datos sincronizada");
  })
  .catch((err) => {
    console.error("Error al sincronizar la base de datos:", err);
  });

module.exports = sequelize;
