const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/bats should return an array of bats', async () => {
    const res = await request(app).get('/bats');
    expect(res.body[0]).toEqual({ 'id': '1', 'name': 'PARASTRELLUS HESPERUS', 'nickname': 'Canyon Bat' });
  });
  it('/bats/1 should return an array of bats', async () => {
    const res = await request(app).get('/bats/1');
    expect(res.body).toEqual({ 'id': '1', 'name': 'PARASTRELLUS HESPERUS', 'nickname': 'Canyon Bat' });
  });
  afterAll(() => {
    pool.end();
  });
});
