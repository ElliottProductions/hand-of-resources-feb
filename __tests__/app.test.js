const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('first bat test!', async () => {
    const res = await request(app).get('/bats');
    expect(res.body[0]).toEqual(1);
  });
  afterAll(() => {
    pool.end();
  });
});
