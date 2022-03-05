const moment = require("moment");

exports.run = async (client, channel, message, args) => {
  //Checks if there is enough arguments or if the first argument does not contain a guild userID
  if (args.length < 1 || isNaN(args[0])) return client.emit("usage", channel, this.help);
  let user = await message.guild.fetchBans().then(bans => bans.get(args[0]) );
  //Check if the user is banned.
  if (user === undefined) return channel.send("That user is currently not banned.");
  //Gets the reason
  let reason = args.slice(1).join(" ");
  //Unbans the user
  await message.guild.unban(user, reason);

  client.emit("moderationLog", message.guild, "unban", false, [message.author, user, "", ""]);
  return {
    reason: reason
  };
};


exports.config = {
  icon: ":raised_hands:"
};

exports.help = {
  description: "Unbans a user",
  usage: [
    "unban [userID] [optional reason]"
  ],
  example: [
    "unban 199250096062332929",
    "unban 186135839867142144 Was bad now good!"
  ],
  botPermissions: [
    "MANAGE_ROLES",
    "BAN_MEMBERS"
  ],
  userPermissions: [
    "BAN_MEMBERS"
  ]
};
