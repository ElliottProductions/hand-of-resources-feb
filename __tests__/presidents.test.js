const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/president should return an array of presidents', async () => {
    const res = await request(app).get('/presidents');
    expect(res.body[0]).toEqual({ 'id': '1', 'name': 'Richard Milhous Nixon', 'nickname': 'Tricky Dick' });
  });
  it('/presidents/2 should return a president based on id', async () => {
    const res = await request(app).get('/presidents/2');
    expect(res.body).toEqual({ 'id': '2', 'name': 'George W. Bush', 'nickname': 'Dubya' });
  });
  it('POST /presidents should creates a new president', async () => {
    const res = await request(app).post('/presidents').send({ name: 'FUZZIUS BATUS', nickname: 'Fuzzy Bat' });
    expect(res.body.name).toEqual('FUZZIUS BATUS');
  });
  it('POST /presidents/:id should update a president', async () => {
    const res = await request(app).put('/presidents/1').send({ name: 'FUZZIUS ROUNDUS', nickname: 'Fuzzy Round Bat' });
    expect(res.body.name).toEqual('FUZZIUS ROUNDUS');
  });
  it('DELETE /presidents/:id should delete a president', async () => {
    const res = await request(app).delete('/presidents/2');
    expect(res.status).toEqual(200);

    const { body } = await request(app).get('/presidents/');
    expect(body.length).toBeLessThan(3);
  });
  afterAll(() => {
    pool.end();
  });
});

