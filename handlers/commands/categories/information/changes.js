exports.run = (client, channel) => {
  return channel.send({embed: {
    color: client.colors.defaultColor,
    description: `Looking for the most recent changes?\nMake sure to check out our support server [here.](${client.config.social.support})`
  }});
};
exports.config = {
  icon: ":new:"
};

exports.help = {
  description: "Get the latest changes regarding the bot.",
  usage: [
    "changes"
  ],
  example: [
    "changes"
  ]
};
