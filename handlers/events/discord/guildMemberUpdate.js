module.exports = (oldMember, newMember) => {
  if (oldMember.nickname !== newMember.nickname) return oldMember.guild.client.emit("moderationLog", oldMember.guild, "nickname", false, [newMember.user, oldMember.nickname, newMember.nickname]);
};
