/** @format */
const request = require('supertest');
const server = require('./server');
const db = require('../database/dbConfig');


describe('Register', () => {
    beforeEach(async () => {
        await db('users').truncate();
      });

const newUser = { username: 'someone', password: 'someone', role : 1};
const someone = { username: 'TheTrabin', password: 'waffles', role : 2};

	it('returns a json obj', async () => {
		await request(server)
			.post('/api/auth/register')
			.send(newUser)
			.then(res => {
				expect(res.type).toBe('application/json');
				expect(res.status).toBe(201);
            })
            .catch(err => console.log(err));
        });

	it('201', async () => {
		await request(server)
			.post('/api/auth/register')
			.send(someone)
			.then(res => {
                expect(res.status).toBe(201);
            })
            .catch(err => console.log(err));
	});
});