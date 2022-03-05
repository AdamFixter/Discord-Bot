module.exports = guildMember => {
  return guildMember.guild.client.emit("moderationLog", guildMember.guild, "memberjoin", false, [guildMember.user]);
};
