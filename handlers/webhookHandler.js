const utility = require("../utility");
module.exports = {
  getEventHook: function(guild, event, getChannel) {
    let guildHooks = guild.settings.webhooks;
    let channels = Object.keys(guildHooks);

    for (let i = 0; i < channels.length; i++) {
      if (guildHooks[channels[i]] && guildHooks[channels[i]].logs.includes(event)) {
        let channel = guild.channels.get(channels[i]);
        if (!channel) return;

        if (getChannel) return channel;

        return new Promise(function(res, rej) {
          guild.fetchWebhooks().then(hooks => {
            let foundHook = hooks.get(guildHooks[channels[i]].id);
            if (!foundHook) {
              channel.createWebhook(guild.client.user.username, guild.client.user.displayAvatarURL).then(wb => {
                guild.settings.webhooks[channel.id] = {
                  id: wb.id,
                  logs: [event]
                };
                res(wb);
              }).catch(e => rej(e));
            } else {
              res(foundHook);
            }
          });
        });
      }
    }
  },

  createEventHook: async function(channel, event) {
    await channel.createWebhook(channel.client.user.username, channel.client.user.displayAvatarURL).then(wb => {
      channel.guild.settings.webhooks[channel.id] = {
        id: wb.id,
        logs: [event]
      };
      return wb;
    }).then().catch(err => channel.send("Maximum number of webhooks reached (10). Try deleting some. ;)"));
  },

  containsEvent: function(guild, event) {
    let guildHooks = guild.settings.webhooks;
    let channels = Object.keys(guild.settings.webhooks);
    for (let i =0; i < channels.length; i++) {
      if (guildHooks[channels[i]].logs.includes(event)) return true;
    }
    return false;
  }
};
