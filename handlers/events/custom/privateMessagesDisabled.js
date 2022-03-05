module.exports = (channel) => {

  channel.send({embed: {
    color: channel.guild.members.get(channel.client.user.id).displayColor,
    description: `Woah there ${message.member}. Make sure you have your private messages enabled`
  }}).then(5000);
};
