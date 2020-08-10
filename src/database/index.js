const databaseConfig = require('../../knexfile').development
const knex = require('knex')(databaseConfig)

module.exports = knex
