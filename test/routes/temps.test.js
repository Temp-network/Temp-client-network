require('dotenv').config();

const request = require('supertest');
const app = require('../../lib/app');
const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose');
const seedData = require('../seedData');

describe('temps routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can get all temps', async() => {
    const { temps } = await seedData();
    const tempsJSON = JSON.parse(JSON.stringify(temps));
    return request(app)
      .get('/api/v1/temps')
      .then(res => {
        tempsJSON.map(temp => {
          expect(res.body).toContainEqual(temp);
        });
        expect(res.body).toHaveLength(1000);
      });
  });

  it('can get 10 latest temps by monitor id', async() => {
    const { monitors } = await seedData();
    const monitor = monitors[0];

    return request(app)
      .get(`/api/v1/temps/${monitor._id}`)
      .then(res => {
        expect(res.body).toHaveLength(10);
      });
  });

  it('can get average temps for all monitors', async() => {
    await seedData();

    return request(app)
      .get('/api/v1/temps/average')
      .then(res => {
        expect(res.body).toEqual({
          AverageTemp: expect.any(Number)
        });
      });
  });
});
