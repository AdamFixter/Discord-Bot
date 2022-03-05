module.exports = guild => {
  console.log(`[JOINED] ${guild.name} (id: ${guild.id}) [${guild.memberCount}]`);
  return guild.client.channels.get("458360747517280278").send({embed: {
    color: guild.client.colors.defaultColor,
    title: `New Guild | ${guild.name}`,
    thumbnail: {
      url: guild.iconURL
    },
    description: `**Owner:** ${guild.owner.user}\n**Unique Users:** ${guild.members.filter(m => !m.user.bot).size}\n**Region:** ${guild.region}`
  }});
};
