module.exports = message => {
  if (message.content) return message.guild.client.emit("moderationLog", message.guild, "messagedelete", false, [message.author, message]);
};
