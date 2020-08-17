/** @format */

const server = require('./server');
const request = require('supertest');
const db = require('../database/dbConfig');

describe('jokes', () => {
	it('returns a JSON object', async () => {
		const res = await request(server).get('/api/jokes');
		expect(res.type).toBe('application/json');
	});
	it('return a 401', () => {
		return request(server)
			.get('/api/jokes')
			.then((jokes) => {
				expect(jokes.status).toEqual(401);
			});
	});
});



