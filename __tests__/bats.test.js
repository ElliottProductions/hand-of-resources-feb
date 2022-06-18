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
  it('/bats/2 should return a bat based on id', async () => {
    const res = await request(app).get('/bats/2');
    expect(res.body).toEqual({ 'id': '2', 'name': 'DESMODUS ROTUNDUS', 'nickname': 'Common Vampure Bat' });
  });
  it('POST /bats should create a new bat', async () => {
    const res = await request(app).post('/bats').send({ name: 'FUZZIUS BATUS', nickname: 'Fuzzy Bat' });
    expect(res.body.name).toEqual('FUZZIUS BATUS');
  });
  it('POST /bats/:id should update a bat', async () => {
    const res = await request(app).put('/bats/1').send({ name: 'FUZZIUS ROUNDUS', nickname: 'Fuzzy Round Bat' });
    expect(res.body.name).toEqual('FUZZIUS ROUNDUS');
  });
  it('DELETE /bats/:id should delete a bat', async () => {
    const res = await request(app).delete('/bats/2');
    expect(res.status).toEqual(200);

    const { body } = await request(app).get('/bats/');
    expect(body.length).toBeLessThan(3);
  });
  afterAll(() => {
    pool.end();
  });
});

