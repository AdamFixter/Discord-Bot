module.exports = emoji => {
  return emoji.guild.client.emit("moderationLog", emoji.guild, "emojicreate", false, [emoji]);
};
