module.exports = (oldMessage, newMessage) => {
  //Ignore the bot
  if (oldMessage.author.id === oldMessage.client.user.id) return;

  //messageEdit
  if(oldMessage.content !== newMessage.content) {
    require("../handlers/automod/handler")(newMessage);
    return newMessage.guild.client.emit("moderationLog", newMessage.guild, "messageedit", false, [newMessage.author, oldMessage.content, newMessage.content]);
  }
};
