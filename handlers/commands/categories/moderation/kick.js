const utility = require("../../../../utility");

exports.run = async (client, channel, message, args) => {
  //Checks if there is enough arguments or if the first argument does not contain a userID or a user Mention
  if (args.length < 1) {
    client.emit("usage", channel, this.help);
    return false;
  }
  let member = utility.getUser(args[0], message.guild, true);
  if (!member) return channel.send("Are you sure this user exists?");
  //Checks if the member can be kicked
  if(!member.kickable || message.author.id === member.id || member.hasPermission(this.help.userPermissions)) return channel.send("You may not kick that user.");
  //Get the reason
  let reason = args[1] ? args.slice(1, args.length).join(" ") : "";
  //Kick the user
  await member.kick(reason);
  //Logging the kick
  client.emit("moderationLog", message.guild, "kick", false, [message.author, member.user, reason, ""]);
  //Success
  return {
    reason: reason,
    duration: utility.formatMilliseconds(endDate.valueOf())
  };
};

exports.config = {
  icon: ":boot:"
};

exports.help = {
  description: "Kicks a user.",
  usage: [
    "kick [userMention/userID] [optional reason]"
  ],
  example: [
    "kick @Vibezz#8212",
    "kick @ItsComits#3526 Are you serious?"
  ],
  botPermissions: [
    "KICK_MEMBERS"
  ],
  userPermissions: [
    "KICK_MEMBERS"
  ]
};
