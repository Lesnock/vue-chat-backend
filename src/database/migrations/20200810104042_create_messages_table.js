
exports.up = function (knex) {
  return knex.schema.createTable('messages', table => {
    table.increments('id')
    table.integer('sender_id')
    table.integer('recipient_id')
    table.text('text')
    table.date('date')

    // References
    table.foreign('sender_id').references('id').inTable('users')
    table.foreign('recipient_id').references('id').inTable('users')
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('messages')
};
