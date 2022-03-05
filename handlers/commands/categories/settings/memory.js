exports.run = (client, channel, message) => {
  let guild = message.guild;
  let bytesUsed = client.handlers.settings.getBytesUsed(guild);
  let onePercent = client.config.memory.maxBytes / 100;

  return channel.send({embed: {
    title: "Memory Usage",
    description: "Shows you how much memory you have used and have left.",
    color: bytesUsed < (52 * onePercent) ? client.colors.yellow : (bytesUsed < (95 * onePercent) ? client.colors.orange : client.colors.red),
    image: {
      url: `attachment://${guild.id}.png`
    }
  }, files: [{ attachment: client.handlers.settings.getMemoryBar(message.guild), name: `${guild.id}.png`}]
  });
};

exports.config = {
  icon: "<:memory:551445092397744144>",
  aliases: [
    "mem"
  ]
};

exports.help = {
  description: "Shows the total used and avaiable memory.",
  usage: [
    "memory"
  ],
  example: [
    "memory",
  ],
  userPermissions: [
    "ADMINISTRATOR"
  ]
};
