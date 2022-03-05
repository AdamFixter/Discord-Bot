exports.run = (client, channel) => {
  return channel.send({embed: {
    color: client.colors.defaultColor,
    description: `**Vote link:** [Click here](${client.config.social.vote})`
  }});
};

exports.config = {
  icon: ":white_check_mark:",
};

exports.help = {
  description: "Get the bot vote link.",
  usage: [
    "vote"
  ],
  example: [
    "vote"
  ]
};
