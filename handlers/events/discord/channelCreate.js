module.exports = channel => {
  if (channel.type === "dm") {
    return;
  }
  if (channel.guild.members.get(channel.client.user.id).joinedAt > (Date.now() - 3000)) {
    return;
  }
  return channel.guild.client.emit("moderationLog", channel.guild, "channelcreate", false, [channel]);
};
