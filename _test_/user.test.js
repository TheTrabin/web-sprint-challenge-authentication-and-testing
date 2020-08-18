/** @format */

const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');

describe('User List tests', () => {
	beforeAll(async () => {
		await db('users').truncate();
	});

	
	

	it('User list - Mike', async () => {
		const mike = { username: 'Mike', password: 'McLeod', role: 1 };
		const mikeLogger = { username: 'Mike', password: 'McLeod' };
		await request(server)
			.post('/api/auth/register')
			.send(mike)
			.then(async () => {
				await request(server)
					.post('/api/auth/login')
					.send(mikeLogger)
					.expect(200)
					.then(async (res) => {
						const token = res.body.token;

						await request(server)
							.get('/api/users')
							.set('authorization', token)
							.then((res) => {
								expect(res.status).toBe(200);
							})
							
					})
					.catch((error) => console.log(error));
			});
	});

	it('User list', async () => {
		const baker = { username: 'Baker', password: 'cookies', role: 2 };
		const bakerLogger = { username: 'Baker', password: 'cookies' };
		await request(server)
	.post('/api/auth/register')
	.send(baker)
	.then(async (res) => {
		await request(server)
			.post('/api/auth/login')
			.send(bakerLogger)
			.expect(200)
			.then(async (res) => {
				const token = res.body.token;
				await request(server)
					.get('/api/users')
					.set('authorization', token)
					.expect(401);
			})
			.catch((error) => console.log(error));
	});
	});

	it('User list - Trabin: Pass', async () => {
		const trabin = { username: 'Trabin', password: 'toast', role: 1 };

	
	const trabinLogger = { username: 'Trabin', password: 'toast' };
	await request(server)
	.post('/api/auth/register')
	.send(trabin)
	.then(async (res) => {
		await request(server)
			.post('/api/auth/login')
			.send(trabinLogger)
			.expect(200)
			.then(async (res) => {
				const token = res.body.token;
				await request(server)
					.get('/api/users')
					.set('authorization', token)
					.expect(401);
			})
			.catch((error) => console.log(error));
	});
	});
});
