
exports.up = function (knex) {
  return knex.schema.table('messages', table => {
    table.boolean('viewed').defaultTo(false)
  })
};

exports.down = function (knex) {
  return knex.schema.table('messages', table => {
    table.dropColumn('viewed')
  })
};
