require('dotenv').config();

const request = require('supertest');
const app = require('../../lib/app');
const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose');
const seedData = require('../routes/seedData');

describe('Monitor routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('gets all Monitors', async() => {
    const { monitors } = await seedData();

    return request(app)
      .get('/api/v1/monitors')
      .then(res => {
        monitors.forEach(monitor => {
          expect(res.body).toContainEqual(JSON.parse(JSON.stringify(monitor)));
        });
        expect(res.body).toHaveLength(20);
      });
  });

  it('gets a Monitor by ID', async() => {
    const { monitors } = await seedData();
    const monitor = monitors[14];

    return request(app)
      .get(`/api/v1/monitors/${monitor._id}`)
      .then(res => {
        expect(res.body).toEqual(JSON.parse(JSON.stringify(monitor)))
      });
  });

  //monitor by id
  //get all monitors
  // get all temp by monitor id
});
