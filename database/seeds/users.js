
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Mike', password: '$2y$14$Y.Y/PrMbCV9Cmw2Imrrtl.2DesBfXyqBm9ZXPR6mizwdo6G/pBUGq', 'role' : 1},
        {id: 2, username: 'Trabin', password: '$2y$14$uxiwWB98H2dR/Z7mNv17O.Bokd20OW1MyiZoYxM8BiOxVyUbjIQO6', 'role' : 1},
        {id: 3, username: 'Baker', password: '$2y$12$IP05IPcgxQyXWDrakwy5UesD5L8IPMs8dnB5qGkA0DBeWzzry1O/i', 'role' : 2}
      ]);
    });
};
