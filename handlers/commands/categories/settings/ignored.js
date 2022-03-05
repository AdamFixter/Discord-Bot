exports.run = (client, channel, message) => {
  let ignored = message.guild.settings.commands.blacklist;
  return channel.send({embed: {
    color: client.colors.defaultColor,
    title: "Ignored List:",
    description: `${ignored.length > 0 ? ignored.join("\n") : "Nothing ignored :("}`
  }});
};

exports.config = {
  emoji: ":see_no_evil:"
};

exports.help = {
  description: "See what's been ignored from commands.",
  usage: [
    "ignored"
  ],
  example: [
    "ignored"
  ],
  userPermissions: [
    "ADMINISTRATOR"
  ]
};
