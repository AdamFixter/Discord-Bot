const utility = require("../../../../utility");
const webhookHandler = require("../../../../handlers/webhookHandler");

exports.run = (client, channel, message, args) => {
  //Checks if there is enough arguments or if the first argument does not contain a userID or a user Mention
  if (args.length < 2) return client.emit("usage", channel, this.help);

  if (!webhookHandler.containsEvent(message.guild, "report")) return channel.send(`Look like you need to enable report logging first (\`${message.guild.settings.prefix}log report\`)`);

  let member = utility.getUser(args[0], message.guild, true);
  if (!member) return channel.send("Are you sure this user exists?");

  if (member.id === message.author.id) return channel.send(`${message.author}, Why would you want to report yourself?`);
  let reason = args.slice(1).join(" ");
  client.emit("moderationLog", message.guild, this.help.name, false, [message.author, member.user, reason]);
  return {
    reason: reason
  };
};

exports.config = {
  icon: ":pencil:"
};

exports.help = {
  description: "Notify staff about a rule breaker.",
  usage: [
    "report [userMention/userID] [reason]"
  ],
  example: [
    "report @ItsComits#3526 Advertising"
  ],
  botPermissions: [
    "MANAGE_MESSAGES"
  ]
};
