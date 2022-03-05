module.exports = async channel => {
  await channel.guild.client.emit("deletions", channel.guild, channel.id);
  return channel.guild.client.emit("moderationLog", channel.guild, "channeldelete", false, [channel]);
};
