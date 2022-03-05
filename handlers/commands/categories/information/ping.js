exports.run = (client, channel) => {
  return channel.send({embed: {
    color: client.colors.defaultColor,
    description: `:ping_pong:  **Pong!** \`\`${Math.round(client.ping)}ms\`\``
  }});
};

exports.config = {
  icon: ":satellite:"
};

exports.help = {
  description: "Get the bots ping.",
  usage: [
    "ping"
  ],
  example: [
    "ping"
  ]
};
