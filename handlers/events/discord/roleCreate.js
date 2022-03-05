module.exports = role => {
  return role.guild.client.emit("logTest", role.guild, "rolecreate", false, [role]);
};
