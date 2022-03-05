const webhookHandler = require("../../../../handlers/webhookHandler");

exports.run = (client, channel, message, args) => {
  if (args.length < 1) {
    client.emit("usage", channel, this.help);
    return false;
  }
  if (!webhookHandler.containsEvent(message.guild, "suggestion")) return channel.send(`Look like you need to enable suggestion logging first (\`${message.guild.settings.prefix}log suggestion\`)`);

  client.emit("moderationLog", message.guild, this.help.name, false, [message.author, args.join(" ")]);
  return channel.send(`${message.author}, Your suggestion has been sent. Thank you.`);
};

exports.config = {
  icon: ":bulb:",
  aliases: [
    "suggest"
  ]
};

exports.help = {
  description: "Suggest an idea.",
  usage: [
    "suggestion [idea]"
  ],
  example: [
    "suggest Add Owl to your server with +invite :P"
  ],
  botPermissions: [
    "MANAGE_MESSAGES"
  ]
};
