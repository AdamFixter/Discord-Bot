module.exports = async guildMember => {
  await guildMember.guild.client.emit("deletions", guildMember.guild, guildMember.id);
  if (guildMember.client.user.id === guildMember.id) {
    return;
  }
  return guildMember.guild.client.emit("moderationLog", guildMember.guild, "memberleave", true, [guildMember.user, guildMember.user]);
};
