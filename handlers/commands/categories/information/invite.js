exports.run = (client, channel) => {
  return channel.send({embed: {
    color: client.colors.defaultColor,
    description: `**Support Server:** [http://www.someaddress.com](custom text) \n[Click here](${client.config.social.support})\n**Documentation**: [Click here](https://owlbot.gitbook.io/owlbot/)\n**Owl Bot:**  [Click here](${client.config.social.invite})`
  }});
};

exports.config = {
  icon: ":love_letter:",
  aliases: [
    "support"
  ]
};

exports.help = {
  description: "Get the bots invite link.",
  usage: [
    "invite"
  ],
  example: [
    "invite"
  ]
};
