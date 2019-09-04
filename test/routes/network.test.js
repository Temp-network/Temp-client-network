require('dotenv').config();

const request = require('supertest');
const app = require('../../lib/app');
const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose');
const Monitor = require('../../lib/models/Monitors');

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

  it('can register a monitor', () => {
    const name = 'Mars';
    return request(app)
      .post('/register')
      .send({ name })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.id).toEqual(expect.any(String));
      });
  });

  it('can deregister a monitor by id', () => {
    return request(app)
      .delete('/deregister')
      .then(res => {
        expect(res.status).toEqual(204);
      });
  });

  it('can recieve temperature', async() => {
    const monitor = await Monitor.create({ name: 'mars' });
    const temperature = 45;

    return request(app)
      .post(`/temp/${monitor._id}`)
      .send({ temperature })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          temperature: 45,
          monitorId: monitor._id.toString(),
          __v: 0
        });
      });
  });
});
