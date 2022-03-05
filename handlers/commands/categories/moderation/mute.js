const moment = require("moment");
const utility = require("../../../../utility");

exports.run = async (client, channel, message, args) => {

  //Check for a mention and a valid user id.
  if (args.length < 1) {
    client.emit("usage", channel, this.help);
    return false;
  }

  let member = utility.getUser(args[0], message.guild, true);
  if (!member) return channel.send("Are you sure this user exists?");

  let mutedRole = message.guild.roles.filter(role => role.name === "Muted" && !role.hasPermission["SEND_MESSAGES", "SPEAK"]).first();
  if (mutedRole === undefined) {
    mutedRole = await message.guild.createRole({
      name: "Muted",
      permissions: []
    });
  }
  //Check if the user is trying to punish themselfes
  if (member.id === message.author.id || member.hasPermission(this.help.userPermissions)) return channel.send("You may not mute that user.");
  //Check if the member is already muted
  if(member.roles.has(mutedRole.id)) return channel.send("That user is already muted.");

  let reason = "";
  let endDate = "";
  let isTemporary = "";
  if (args.length > 1) {
    isTemporary = args[1].match( /(\d{1,2}[y|w|d|h|m|s])+/ );
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

  await member.addRole(mutedRole).catch(e => {
    return channel.send("Looks like the Muted role is higher than the bots role. :(");
  });

  if (isTemporary) {
    setTimeout(function() {
      member.removeRole(mutedRole);
      client.emit("moderationLog", message.guild, "unmute", false, [client.user, member.user, "", ""]);
    }, endDate.diff(moment()));
  }

  client.emit("moderationLog", message.guild, this.help.name, false, [message.author, member.user, reason, endDate.valueOf()]);
  return {
    reason: reason,
    duration: utility.formatMilliseconds(endDate.valueOf())
  };
};

exports.config = {
  icon: ":mute:"
};

exports.help = {
  description: "Mutes a user",
  usage: [
    "mute [userMention/userID] [optional timelimit] [optional reason]"
  ],
  example: [
    "mute @ItsComits#3526",
    "mute @Vibezz#8212 Spamming",
    "mute @ItsComits#3526 1d Excessive Caps"
  ],
  botPermissions: [
    "MANAGE_ROLES",
    "MUTE_MEMBERS"
  ],
  userPermissions: [
    "MUTE_MEMBERS"
  ]
};
