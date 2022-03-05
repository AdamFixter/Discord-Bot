module.exports = async (message) => {
  let settings = message.guild.settings.automod;
  //if (message.member.hasPermission("ADMINISTRATOR")) return;
  let activeChecks = Object.keys(settings).reduce(function(acc, category) {
    if (settings[category].enabled) {
      Object.keys(settings[category]).forEach(check => {
        if (settings[category][check].enabled) {
          if (!acc[category]) acc[category] = {};
          acc[category][check] = settings[category][check];
        }
      });
    }
    return acc;
  },{});

  for (let category in activeChecks) {
    for (let check in activeChecks[category]) {
      let options = settings[category][check];
      //if (utility.isBlacklisted(message, blacklist, false)) continue; //TODO: ADD
      let flagged = message.client.automod.categories[category][check].check(message, options);
      if (!flagged) continue;

      let channel = options.dm ? message.author : message.channel;
      let responses = options.response;
      if (responses.length > 0) channel.send(responses[Math.floor(Math.random() * responses.length)].replaceVariables(message, flagged)).then(msg => msg.delete(5000).catch(e => {}));
      if (options.delete) message.delete().catch(e => {});
      //message.client.emit("moderationLog", message.guild, check, false, [message.author, message]);

    }
  }
};
