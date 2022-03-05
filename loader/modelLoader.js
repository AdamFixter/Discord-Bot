module.exports = client => {
  client.models = {
    guild: {
      timers: {
        fetchedMembers: Date.now() + client.config.timers.guild.fetchMembers //1 Hour
      },
      prefixes:  client.commands.config.prefixes,
      webhooks: {},
      commands: generateOptions(client.commands.categories),
      automod: generateOptions(client.automod.categories),
      logs: generateOptions(client.logs.categories),
    }
  };
  client.settings = {
    blacklist: [],
    images: []
  };
};

function generateOptions(settings) {
  return Object.keys(settings).reduce((acc, category) => {
    if (!acc[category]) acc[category] = { enabled: settings[category].enabled };
    Object.keys(settings[category]).forEach(command => {
      let thing = settings[category][command];
      if (!thing.config) return;
      if (!acc[category][command]) acc[category][command] = { enabled: thing.config.enabled};

      let options = thing.config.options;
      options.forEach(option => {
        let optionName = Object.keys(option)[0];
        option = option[optionName];
        let multipleValues = option.values;
        if (!multipleValues) return acc[category][command][optionName] = option.default;
        acc[category][command][optionName] = Object.keys(multipleValues).reduce( (a, valueName) => ({ ...a, [valueName]: multipleValues[valueName].default }), {});

      });
    });
    return acc;
  }, {});
}
