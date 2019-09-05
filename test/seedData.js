const chance = require('chance').Chance();
const Temp = require('../lib/models/Temp');
const Monitor = require('../lib/models/Monitors');

module.exports = async({ temperatures = 1000, monitors = 15 } = { temperatures: 1000, monitors: 15 }) => {
  const createdMonitors = await Monitor.create(
    [...Array(monitors)].map(() => ({
      name: chance.name()
    }))
  );

  const createdTemps = await Temp.create(
    [...Array(temperatures)].map(() => ({
      monitorId: chance.pickone(createdMonitors)._id,
      temperature: chance.integer({ min: 0, max: 200 })
    }))
  );

  return {
    monitors: createdMonitors,
    temps: createdTemps
  };
};
