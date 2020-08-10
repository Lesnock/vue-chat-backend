
exports.up = function (knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id')
    table.string('name')
    table.string('username').unique()
    table.string('email').unique()
    table.string('avatar')
    table.string('password')
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('users')
};
