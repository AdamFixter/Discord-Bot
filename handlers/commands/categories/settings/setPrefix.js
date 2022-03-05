exports.run = (client, channel, message, args) => {
  //+setPrefix [hey]
  if (args.length < 1) return false;

  let guildSettings = message.guild.settings;
  let prefixes = guildSettings.prefixes;
  let prefix = args[0].toLowerCase();

  let hasPrefix =  prefixes.includes(prefix);
  hasPrefix ? prefixes.splice(prefixes.indexOf(prefix), 1) : guildSettings.prefixes.push(prefix);

  client.handlers.settings.save(message);
  return message.channel.send({embed: client.utility.message.createEmbed({
    description: `${hasPrefix ? "**Removed** " : "**Added**"} ${prefix} ${hasPrefix ? "from " : "to " + "the list."}`,
    footer: {
      text: `Current prefixes: @Owl#8646, ${prefixes.join(", ")}`
    }
  }).build()});
};

exports.config = {
  icon: ":label:"
};

exports.help = {
  description: "Set the prefix of the bot.",
  usage: [
    "setPrefix [prefix]"
  ],
  example: [
    "setPrefix owl"
  ],
  userPermissions: [
    "ADMINISTRATOR"
  ]
};
