module.exports = {
  development: {
    client: 'sqlite',
    connection: {
      filename: './database.sqlite'
    },
    migrations: {
      directory: './database/migrations'
    }
  }
}
