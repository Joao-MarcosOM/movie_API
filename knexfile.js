const path = require("path");

module.exports = {
  development: {
    client: 'sqlite3', //Aqui informamos qual o banco de dados que iremos utilizar
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db") //Aqui precisamos dizer em que lugar está o arquivo do nosso banco de dados
    },
    migrations:{
      directory: path.resolve(__dirname, "src","database", "knex", "migrations")
    },
    useNullAsDefault: true
  }
};