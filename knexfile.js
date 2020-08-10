module.exports = {
  development: {
    client: 'sqlite',
    connection: {
      filename: './src/database/database.sqlite'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    seeds: {
      directory: './src/database/seeds'
    },
    useNullAsDefault: true
  }
}
