const db = require('../database')

class User {
  static getByUsername() {
    return db('users').where('username', username).first()
  }
}

module.exports = User
