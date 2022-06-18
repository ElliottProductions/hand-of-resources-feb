const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/homonid should return an array of homonids', async () => {
    const res = await request(app).get('/homonids');
    expect(res.body[0]).toEqual({ 'id': '1', 'name': 'Homo sapiens', 'nickname': 'Human' });
  });
  it('/homonids/2 should return a homonid based on id', async () => {
    const res = await request(app).get('/homonids/2');
    expect(res.body).toEqual({ 'id': '2', 'name': 'Homo erectus', 'nickname': 'Upright Man' });
  });
  it('POST /homonids should creates a new homonid', async () => {
    const res = await request(app).post('/homonids').send({ name: 'FUZZIUS BATUS', nickname: 'Fuzzy Bat' });
    expect(res.body.name).toEqual('FUZZIUS BATUS');
  });
  it('POST /homonids/:id should update a homonid', async () => {
    const res = await request(app).put('/homonids/1').send({ name: 'FUZZIUS ROUNDUS', nickname: 'Fuzzy Round Bat' });
    expect(res.body.name).toEqual('FUZZIUS ROUNDUS');
  });
  it('DELETE /homonids/:id should delete a homonid', async () => {
    const res = await request(app).delete('/homonids/2');
    expect(res.status).toEqual(200);

    const { body } = await request(app).get('/homonids/');
    expect(body.length).toBeLessThan(3);
  });
  afterAll(() => {
    pool.end();
  });
});

