const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/salamanders should return an array of salamanders', async () => {
    const res = await request(app).get('/salamanders');
    expect(res.body[0]).toEqual({ 'id': '1', 'name': 'PLEURODELES WALTL', 'nickname': 'Spanish Ribbed Newt' });
  });
  it('/salamanders/2 should return a salamander based on id', async () => {
    const res = await request(app).get('/salamanders/2');
    expect(res.body).toEqual({ 'id': '2', 'name': 'NEURERGUS KAISERI', 'nickname': 'Iranian Harlequin Newt' });
  });
  it.skip('POST /salamanders should create a new salamander', async () => {
    const res = await request(app).post('/salamanders').send({ name: 'FUZZIUS BATUS', nickname: 'Fuzzy Bat' });
    expect(res.body.name).toEqual('FUZZIUS BATUS');
  });
  it.skip('POST /salamanders/:id should update a salamander', async () => {
    const res = await request(app).put('/salamanders/1').send({ name: 'FUZZIUS ROUNDUS', nickname: 'Fuzzy Round Bat' });
    expect(res.body.name).toEqual('FUZZIUS ROUNDUS');
  });
  it.skip('DELETE /salamanders/:id should delete a salamander', async () => {
    const res = await request(app).delete('/salamanders/2');
    expect(res.status).toEqual(200);

    const { body } = await request(app).get('/salamanders/');
    expect(body.length).toBeLessThan(3);
  });
  afterAll(() => {
    pool.end();
  });
});

