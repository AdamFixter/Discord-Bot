const fs = require("fs");
const utility = require("../../../../utility");
const webhookHandler = require("../../../../handlers/webhookHandler");

exports.run = async (client, channel, message, args) => {
  let settings = message.guild.settings;
  let activeEvents = [];
  Object.keys(settings.webhooks).forEach(channelID => activeEvents = activeEvents.concat(settings.webhooks[channelID].logs));
  if (args.length < 1) return channel.send({embed: buildSettings(message, activeEvents)});
  let keys = Object.keys(message.client.logs);
  let event = args[0].toLowerCase();
  if (!keys.includes(event)) {
    client.emit("usage", channel, this.help);
    return false;
  }

  let getChannel = utility.getChannel(args[1], message.guild);
  let channelToCheck = getChannel ? getChannel : message.channel;
  let enabled = activeEvents.includes(event);


  if (enabled) {
    let channelID = webhookHandler.getEventHook(message.guild, event, true).id;
    settings.webhooks[channelID].logs.splice(settings.webhooks[channelID].logs.indexOf(event), 1);
  }
  if (!enabled || getChannel){
    if (!settings.webhooks[channelToCheck.id]) {
      await webhookHandler.createEventHook(channelToCheck, event);
    } else {
      channel.guild.settings.webhooks[channelToCheck.id].logs.push(event);
    }
  }
  return channel.send({embed: buildToggle(message, args[0], !enabled || getChannel, channelToCheck)});
};

function buildToggle(message, action, enabled, channel) {
  return {
   color: message.client.colors.defaultColor,
   description: enabled ? `**Enabled** ${action} logging in the channel ${channel}.` : `**Disabled** ${action} logging.`,
   footer: {
     icon_url: message.author.avatarURL,
   }
 };
}

function buildSettings(message, activeEvents) {
  let logs = message.client.logs;
  let categorys = [ ... new Set(Object.values(logs).map(c => c.category)) ];
  let settings = message.guild.settings;
  let prefix = message.guild.settings.prefix;
  let description = `Below are a list of modules that can be logged. Use \`${prefix}log <event>\` to enabled/disable logging for the command. For more information do \`${prefix}help log\`\n`;
  let fields = [];

  let all = settings.webhooks.logAll;
  for (let i = 0; i < categorys.length; i++) {

    let events = Object.keys(logs).filter(key => logs[key].category === categorys[i]).map(event => {
      let isActive = activeEvents.includes(event);
      return `${event}: ${!isActive && !all ? `none` : webhookHandler.getEventHook(message.guild, all && !isActive ? "all" : event, true)}`;
    }).join("\n");

    fields.push({
       name: `${categorys[i].charAt(0).toUpperCase() + categorys[i].slice(1)}`,
       value: `${events}`,
       inline: true
       });
   }
  return {
   color: message.client.colors.defaultColor,
   title: `Log Overview`,
   description: description,
   fields: fields,
   footer: {
     icon_url: message.author.avatarURL
   }
  };
};

exports.config = {
  emoji: ":closed_book:"
};

exports.help = {
  description: "Sets the log channel. channelID optional",
  usage: [
    "log",
    "log [event]",
    "log [event] [optional channel]"
  ],
  example: [
    "log",
    "log mute",
    "log ban #BanLog"
  ],
  botPermissions: [
    "VIEW_AUDIT_LOG",
    "MANAGE_MESSAGES",
    "READ_MESSAGE_HISTORY"
  ],
  userPermissions: [
    "ADMINISTRATOR"
  ]
};
