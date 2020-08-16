
exports.up = function (knex) {
  return knex.schema.table('messages', table => {
    table.boolean('received').defaultTo(false)
  })
};

exports.down = function (knex) {
  return knex.schema.table('messages', table => {
    table.dropColumn('received')
  })
};
