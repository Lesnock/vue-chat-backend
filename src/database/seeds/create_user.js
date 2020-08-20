exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { name: 'Caio Lesnock', username: 'caio', email: 'caio.dev@outlook.com', avatar: 'avatar.jpg', password: '123' },
        { name: 'Gabriela Lesnock', username: 'gabriela', email: 'gabriela.lesnock@outlook.com', avatar: 'avatar.jpg', password: '123' },
        { name: 'Andressa Alves', username: 'andressa', email: 'andressa@metadil.com.br', avatar: 'no-avatar.png', password: '123' },
        { name: 'Danilo Watanabe', username: 'danilo', email: 'danilo@metadil.com.br', avatar: 'no-avatar.png', password: '123' },
        { name: 'Magnólia Rodrigues', username: 'magnolia', email: 'magnolia@metadil.com.br', avatar: 'no-avatar.png', password: '123' },
        { name: 'Luana Costa', username: 'luana', email: 'luana@metadil.com.br', avatar: 'no-avatar.png', password: '123' },
        { name: 'Katiúcia Duarte', username: 'katiucia', email: 'katiucia@metadil.com.br', avatar: 'no-avatar.png', password: '123' },
        { name: 'Massimo Rodorigo', username: 'massimo', email: 'massimo@metadil.com.br', avatar: 'no-avatar.png', password: '123' },
        { name: 'Felipe Querino', username: 'felipe', email: 'felipe@metadil.com.br', avatar: 'no-avatar.png', password: '123' },
        { name: 'John David', username: 'john', email: 'john@metadil.com.br', avatar: 'no-avatar.png', password: '123' },
        { name: 'Bruno Alves', username: 'bruno', email: 'bruno@metadil.com.br', avatar: 'no-avatar.png', password: '123' }
      ]);
    });
};
