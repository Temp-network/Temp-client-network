require('dotenv').config();

const request = require('supertest');
const app = require('../../lib/app');
const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose')

describe('network routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can send a status code', () => {
    return request(app)
      .get('/status')
      .then(res => {
        expect(res.status).toEqual(204);
      });
  });
});
