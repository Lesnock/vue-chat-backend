exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { name: 'Caio Lesnock', username: 'caio', email: 'caio.dev@outlook.com', avatar: 'avatar.jpg', password: '123' },
        { name: 'Gabriela Lesnock', username: 'gabriela', email: 'gabriela.lesnock@outlook.com', avatar: 'avatar.jpg', password: '123' }
      ]);
    });
};
