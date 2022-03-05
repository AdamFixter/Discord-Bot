module.exports = (channel, message, help) => {
  channel.send({embed: {
    color: 3553598,
    author: {
      name: "Correct Usage",
    },
    description: `\`${message.prefix}${help.usage.join(`\n${message.prefix}`)}\``,
    timestamp: new Date(),
    footer: {
      text: "Don't include [] in your command."
    }
  }
  });
};
