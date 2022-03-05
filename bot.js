const discord = require("discord.js");
const client = new discord.Client({
  messageCacheMaxSize: 1,
  disabledEvents: [
    "GUILD_UPDATE", //
    "GUILD_BAN_ADD",
    "GUILD_BAN_REMOVE",
    "CHANNEL_UPDATE", //
    "CHANNEL_PINS_UPDATE",
    "MESSAGE_DELETE_BULK", //
    "USER_NOTE_UPDATE",
    "USER_SETTINGS_UPDATE",
    "TYPING_START",
    "RELATIONSHIP_ADD",
    "RELATIONSHIP_REMOVE"
  ]
});

client.database = require("quick.db");
client.logs = require("./configuration/logs.json");
client.config = require("./config");
client.colors = {
  defaultColor: 9502117,
  red: 13382194,
  orange: 14383915,
  yellow: 15184918,
  green: 4714541
};
require("./handlers/utilityHandler")(client, "utility");
require("./handlers/loaderHandler")(client, "loader");

console.log(client.commands.categories.information.help.config.options);

console.log(client.automod.categories.advert.links.config.options);
//require("./handlers/imageHandler")(client);
client.login("NDY1NTc0MDQwMjE2NTM1MDYx.XKooQQ.KT4JJJb2OO0eEMi4wCxdNjDbDx4");
