/** @format */

const server = require('./server');
const request = require('supertest');
const db = require('../database/dbConfig');

describe('login', () => {
    beforeEach(async () => {
        await db('users').truncate();
      });

	it('200', async () => {
		await request(server)
			.post('/api/auth/register')
			.send({ 'username': 'someone', 'password': 'waffles', 'role': 1 })
			.then(async (res) => {
				await request(server)
					.post('/api/auth/login')
					.send({ 'username': 'someone', 'password': 'waffles' })
					.then((res) => expect(res.status).toBe(200));
			})
			.catch((err) => console.log(err));
	});
});

it('verify json object', async () => {
	await request(server)
		.post('/api/auth/register')
		.send({ username: 'monkey', password: 'banana', role: 1 })
		.then(async () => {
			await request(server)
				.post('/api/auth/login')
                .send({ username: 'monkey', password: 'banana' })
                .then(res => {
				expect(res.type).toBe('application/json');})
		});
});
