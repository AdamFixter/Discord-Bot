module.exports = {
  getGuildData: async function(guild) {
    let current = Date.now();
    if (guild.settings.timers.fetchedMemberss <= current) {
      guild.settings.timers.fetchedMembers = current + guild.client.config.timers.guild.fetchMembers;
      await guild.fetchMembers().catch(console.error);
    }
  }
};
