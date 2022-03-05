const urlRegex = require('url-regex');

exports.run = async (client, channel, message, args) => {
  if (args.length < 1) return false;

  let isUser = client.utility.validator.getUser(args[0], message.guild.members)
  let limit = isUser || isNaN(args[0]) ? parseInt(args[1]) : parseInt(args[0]);

  if (!limit || limit > 100) return channel.send("Make sure you have selected a number which is no larger than 100.");
  let msgs = await message.channel.fetchMessages({ before: message.id, limit: limit });

  switch(true) {
    case isUser:
      msgs = msgs.filter(m => m.author.id === isUser.id);
      break;
    case args[0] === "humans":
      msgs = msgs.filter(m => !m.author.bot);
      break;
    case args[0] === "bots":
      msgs = msgs.filter(m => m.author.bot);
      break;
    case args[0] === "links":
      msgs = msgs.filter(m => urlRegex().test(m.content));
      break;
    case args[0] === "invites":
      msgs = msgs.filter(m => m.content.match(message.client.config.regex.invite) !== null)
      break;
    case args[0] === "images":
      msgs = msgs.filter(m => m.attachments.first() && m.attachments.first().width);
      break;
    case args[0] === "embeds":
      msgs = msgs.filter(m => m.embeds.length > 0);
      break;
    case args[0] === "mentions":
      msgs = msgs.filter(m => m.mentions.everyone || m.mentions.users.first() || m.mentions.roles.first() || m.mentions.channels.first());
      break;
    case args[0] === "reactions":
      msgs = msgs.filter(m => m.reactions.size > 0);
      break;
    case args[0] === "spoilers":
      msgs = msgs.filter(m => m.content.match(new RegExp(/\|\|([\s\S]+?)\|\|/gm)));
      break;
    default:
      return false;
  }
  if (msgs.size === 0) return channel.send("No messages to delete");
  await message.channel.bulkDelete(msgs, true).catch(e => {});
  client.emit("moderationLog", message.guild, this.help.name, false, [message.author, isUser ? isUser : args[0], msgs.size, message.channel]);
  return channel.send(`Successfully deleted ${msgs.size} messages.`);
};

exports.config = {
  icon: ":crossed_swords:",
  aliases: [
    "clean",
    "clear",
    "prune"
  ]
};

exports.help = {
  description: "Remove messages from the current channel. (Limit: 100)",
  usage: [
    "purge",
    "purge [userMention/userID] [amount]",
    "purge humans [amount]",
    "purge bots [amount]",
    "purge links [amount]",
    "purge invites [amount]",
    "purge images [amount]",
    "purge embeds [amount]",
    "purge mentions [amount]",
    "purge reactions [amount]",
    "purge spoilers [amount]"
  ],
  example: [
    "purge 5",
    "purge @Vibezz#8212 10",
    "purge humans 15",
    "purge bots 20",
    "purge links 25",
    "purge invites 30",
    "purge images 35",
    "purge embeds 40",
    "purge mentions 45",
    "purge reactions 50",
    "purge spoilers 55"
  ],
  botPermissions: [
    "MANAGE_MESSAGES",
    "READ_MESSAGE_HISTORY"
  ],
  userPermissions: [
    "MANAGE_MESSAGES"
  ]
};
