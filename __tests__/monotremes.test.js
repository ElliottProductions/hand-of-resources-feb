const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/monotremes should return an array of monotremes', async () => {
    const res = await request(app).get('/monotremes');
    expect(res.body[0]).toEqual({ 'id': '1', 'name': 'Ornithorhynchus anatinus', 'nickname': 'Duck-billed Platypus' });
  });
  it('/monotremes/2 should return a monotreme based on id', async () => {
    const res = await request(app).get('/monotremes/2');
    expect(res.body).toEqual({ 'id': '2', 'name': 'Tachyglossus bruijnii', 'nickname': 'Western long-beaked echidna' });
  });
  it('POST /monotremes should creates a new monotreme', async () => {
    const res = await request(app).post('/monotremes').send({ name: 'FUZZIUS BATUS', nickname: 'Fuzzy Bat' });
    expect(res.body.name).toEqual('FUZZIUS BATUS');
  });
  it('POST /monotremes/:id should update a monotreme', async () => {
    const res = await request(app).put('/monotremes/1').send({ name: 'FUZZIUS ROUNDUS', nickname: 'Fuzzy Round Bat' });
    expect(res.body.name).toEqual('FUZZIUS ROUNDUS');
  });
  it('DELETE /monotremes/:id should delete a monotreme', async () => {
    const res = await request(app).delete('/monotremes/2');
    expect(res.status).toEqual(200);

    const { body } = await request(app).get('/monotremes/');
    expect(body.length).toBeLessThan(3);
  });
  afterAll(() => {
    pool.end();
  });
});

