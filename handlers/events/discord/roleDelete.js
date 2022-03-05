module.exports = async role => {
  await role.guild.client.emit("deletions", role.guild, role.id);
  return role.guild.client.emit("moderationLog", role.guild, "roledelete", false, [role]);
};
