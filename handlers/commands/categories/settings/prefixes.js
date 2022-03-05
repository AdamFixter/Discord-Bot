exports.run = (client, channel, message, args) => {
  return message.channel.send({embed: client.utility.message.createEmbed({
    title: "Prefixes",
    description: `@Owl#8646, ${message.guild.settings.prefixes.join(", ")}`,
  }).build()});
};

exports.config = {
  icon: ":books:"
};

exports.help = {
  description: "List the prefixes of the bot.",
  usage: [
    "prefixes"
  ],
  example: [
    "prefixes"
  ]
};
