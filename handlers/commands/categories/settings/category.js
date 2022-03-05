
exports.run = (client, channel, message, args) => {
  let commands = message.guild.settings.commands;
  let category = args[0];

  if (args.length < 1 || !Object.keys(commands).includes(category)) {
    client.emit("usage", channel, this.help);
    return false;
  }

  if (client.config.categorys[args[0]].whitelisted) return channel.send("You cannot disable this category.");

  let enabled = commands[category].enabled;
  commands[category].enabled = !enabled;

  return channel.send({embed: {
    color: message.client.colors.defaultColor,
    description: `${enabled ? "**Disabled**" : "**Enabled**"} ${category} category.`,
    footer: {
      icon_url: message.author.avatarURL
    }
  }});
};


exports.config = {
  icon: ":file_cabinet:"
};

exports.help = {
  description: "Enable/Disable a category.",
  usage: [
    "category [category]"
  ],
  example: [
    "category moderation"
  ],
  userPermissions: [
    "ADMINISTRATOR"
  ]
};
