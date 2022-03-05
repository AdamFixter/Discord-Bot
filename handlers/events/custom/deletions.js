const utility = require("../../utility");
const settingsHandler = require("../../handlers/settingsHandler");

module.exports = async (guild, id) => {
  let settings = settingsHandler.get(guild);

  Object.keys(settings.webhooks).forEach(channelID => {
    if (channelID === id) delete settings.webhooks[channelID];
  });

  Object.keys(settings.automod).forEach(event => {
    let blacklist = settings.automod[event].blacklist;
    let index = blacklist.map(element => element.replace(/\D+/g, "")).indexOf(id);
    if (index !== -1) delete blacklist.splice(index, 1);
  });

  settingsHandler.save(guild);
};
