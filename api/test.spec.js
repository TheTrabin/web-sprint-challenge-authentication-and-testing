/** @format */

const request = require('supertest');
const server = require('./server');
const db = require('../database/dbConfig');

describe('Register', () => {
	beforeAll(async () => {
		await db('users').truncate();
	});

	const newUser = { username: 'Flan', password: 'lightning' };

	it('should return 201', async () => {
		await request(server)
			.post('/api/auth/register')
			.send(newUser)
			.then((res) => expect(res.status).toBe(201))
			.catch((error) => console.log(error));
	});

	it('Validate', async () => {
		await request(server)
			.post('/api/auth/register')
			.send(newUser)
			.then(async (res) => {
				const addedUser = await db('users')
					.where({ username: newUser.username })
					.first();
				expect(addedUser).toHaveProperty('id');
				expect(addedUser).toHaveProperty('username');
			})
			.catch((error) => console.log(error));
	});
});

describe('Login', () => {
	const user = { username: 'Behemoth', password: 'purpleHorns' };

	it('200', async () => {
		await request(server)
			.post('/api/auth/register')
			.send(user)
			.then(async (res) => {
				await request(server)
					.post('/api/auth/login')
					.send(user)
					.then((res) => expect(res.status).toBe(200))
					.catch((error) => console.log(error));
			});
	});

	it('User list', async () => {
		await request(server)
			.post('/api/auth/login')
			.send(user)
			.then((res) => expect(res.body).toHaveProperty('token'))
			.catch((error) => console.log(error));
	});
});

describe('Jokes', () => {
	it('401', async () => {
		await request(server)
			.get('/api/jokes')
			.then((res) => expect(res.status).toBe(401))
			.catch((error) => console.log(error));
	});

	it('Json type', async () => {
		const newUser = { username: 'Ayebat', password: 'flapping' };

		await request(server)
			.post('/api/auth/register')
			.send(newUser)
			.then(async () => {
				await request(server)
					.post('/api/auth/login')
					.send(newUser)
					.expect(200)
					.then(async (res) => {
						const token = res.body.token;

						await request(server)
							.get('/api/jokes')
							.set('authorization', token)
							.expect('Content-Type', /json/);
					});
			});
	});
});

describe('List of users - No Token', () => {
	it('status code should be 401', async () => {
		const res = await request(server).get('/api/users');
		expect(res.statusCode).toEqual(401);
	});

	it('response should be JSON', async () => {
		const res = await request(server).get('/api/users');
		expect(res.type).toMatch(/json/i);
	});
});

describe('List of Jokes - No Token', () => {
	it('status code should be 401', async () => {
		const res = await request(server).get('/api/jokes');
		expect(res.statusCode).toEqual(401);
	});

	it('response should be JSON', async () => {
		const res = await request(server).get('/api/jokes');
		expect(res.type).toMatch(/json/i);
	});
});
