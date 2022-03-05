const moment = require("moment");
const utility = require("../../../../utility");

exports.run = async (client, channel, message, args) => {
  //Check for a mention and a valid user id.
  if (args.length < 1) {
    client.emit("usage", channel, this.help);
    return false;
  }
  //Get the guild member from the users id. Replacing <>@ from mention string if needed
  let member = utility.getUser(args[0], message.guild, true);
  if (!member) return channel.send("Are you sure this user exists?");

  let mutedRole = message.guild.roles.filter(role => role.name === "Muted" && !role.hasPermission["SEND_MESSAGES", "SPEAK"]).first();
  if (!mutedRole) mutedRole = await message.guild.createRole({
    name: "Muted",
    permissions: []
  })
  if (!member.roles.has(mutedRole.id)) return channel.send("That user is currently not muted.");
  await member.removeRole(mutedRole.id);

  let reason = args.slice(1).join(" ");
  client.emit("moderationLog", message.guild, this.help.name, false, [message.author, member.user, reason]);
  return {
    reason: reason
  };
};


exports.config = {
  icon: ":loud_sound:"
};

exports.help = {
  description: "Unmutes a user",
  usage: [
    "unmute [userMention/userID] [optional reason]"
  ],
  example: [
    "unmute @Vibezz#8212",
    "unmute @ItsComits#3526 Said sorry"
  ],
  botPermissions: [
    "MANAGE_ROLES",
    "MUTE_MEMBERS"
  ],
  userPermissions: [
    "MUTE_MEMBERS"
  ]
};
