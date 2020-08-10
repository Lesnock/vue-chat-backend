const databaseConfig = require('../knexfile')
const knex = require('knex')(databaseConfig)

class Database {

}

module.exports = new Database()
