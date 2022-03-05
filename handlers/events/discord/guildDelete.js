module.exports = guild => {
  console.log(`[LEFT] ${guild.name} (id: ${guild.id}) [${guild.memberCount}]`);
  guild.client.database.delete(guild.id);
};
