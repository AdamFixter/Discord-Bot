const moment = require("moment");
const utility = require("../../../../utility");

exports.run = async (client, channel, message, args) => {
  //Checks if there is enough arguments.
  if (args.length < 1) {
    client.emit("usage", channel, this.help);
    return false;
  }
  //Get the guild member from the users id. Replacing <>@ from mention string if needed
  let user = utility.getUser(args[0], message.guild, false);
  if (!user) return channel.send("Are you sure this user exists?");
  //Check if user is a guildMember, Is so check if it's the author. Else check if it's clyde bot.
  let member = message.guild.members.get(user.id);
  let userCannotBeBanned = member ? !member.bannable  || member.id === message.author.id : user.id === "1" ? true : false;
  if (userCannotBeBanned) return channel.send("You may not ban that user");

  let reason = "";
  let endDate = "";
  let isTemporary = "";
  if (args.length > 1) {
    isTemporary = args[1].match(/(\d{1,2}[y|w|d|h|m|s])+/);
    if (!isTemporary) {
      reason = args[1];
    } else {
      endDate = moment();
      args[1].replace(/(\d{1,2}[y|w|d|h|m|s])/g, function(string, match) {
        let time = parseInt(match.substring(0, match.length-1));
        endDate.add(time > 99 ? 99 : time, match[match.length-1]);
      });
    }
    reason = isTemporary ? args.slice(2, args.length).join(" ") : args.slice(1, args.length).join(" ");
  }
  await message.guild.ban(user, { reason: reason });

  if (isTemporary) {
    setTimeout(function() {
      message.guild.unban(user.id);
      client.emit("moderationLog", message.guild, "unban", false, [client.user, user, "", ""]);
    }, endDate.diff(moment()));
  }
  client.emit("moderationLog", message.guild, this.help.name, false, [message.author, user, reason, endDate.valueOf()]);
  return {
    reason: reason,
    duration: utility.formatMilliseconds(endDate.valueOf())
  };
};


exports.config = {
  icon: ":hammer:"
};

exports.help = {
  description: "Bans a user",
  usage: [
    "ban [userMention/userID] [optional timelimit] [optional reason]"
  ],
  example: [
    "ban @ItsComits#3526",
    "ban @Vibezz#8212 Advertising",
    "ban @ItsComits#3526 1d Spamming"
  ],
  botPermissions: [
    "BAN_MEMBERS"
  ],
  userPermissions: [
    "BAN_MEMBERS"
  ]
};
