const Monitor = require('../../lib/models/Monitors');
const chance = require('chance').Chance();

module.exports = async({ monitors = 20 } = { monitors: 20 }) => {
  const createdMonitors = await Monitor.create(
    [...Array(monitors)].map(() => ({
      name: chance.name()
    }))
  );

  return {
    monitors: createdMonitors
  };
};

