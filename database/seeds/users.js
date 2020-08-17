
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Mike', password: '$2y$12$wtPJHGM3iRdAP7eykc/ZF.1g8B1qH0/8T6DEi4cKJv5KPkehWm7FS', 'role' : 1},
        {id: 2, username: 'Trabin', password: '$2y$12$YcQ4Ig9xCgIkcb4KYwMeS.nmf.GbgJJQsy.94ZndT73ohZFrIfa/.', 'role' : 1},
        {id: 3, username: 'Baker', password: '$2y$12$IUe62ScF4WJW73x8r7WH2ul66YGGkc5DBhEo2bANj/faIELaCoajq', 'role' : 2}
      ]);
    });
};
