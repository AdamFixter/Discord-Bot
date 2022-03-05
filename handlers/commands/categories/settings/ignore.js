const utility = require("../../../../utility");

exports.run = (client, channel, message, args) => {
  let isRoleChannelOrUser = utility.getRole(args[0], message.guild) || utility.getChannel(args[0], message.guild) || utility.getUser(args[0], message.guild, false);
  if (args.length < 1 || !isRoleChannelOrUser) {
    client.emit("usage", channel, this.help);
    return false;
  }

  let value = message.guild.settings.commands.blacklist;
  let valueToAdd = isRoleChannelOrUser ? isRoleChannelOrUser.toString() : args[0];
  let added = value.includes(valueToAdd);

  if (added) {
    let index = value.indexOf(valueToAdd);
    if (index === -1) return channel.send("Looks like it doesn't exist. Maybe try copying and pasting next time. ;)");
    value.splice(index, 1);
  } else {
    if (!value) return channel.send(`OOPS! looks like you hit a road block. If you think it's a problem please join the support server. (\`${message.guild.settings.prefix}support\`)`);
    if (value.length === 10) return channel.send("OOPS, Looks like you have hit the limit (10).");
    value.push(valueToAdd);
  }
  client.handlers.settings.save(message.guild);
  return channel.send(`Successfully ${added ? "removed" : "added"} ${valueToAdd} ${added ? "from" : "to"} the ignored list.`);
};

exports.config = {
  emoji: ":shrug:"
};

exports.help = {
  description: "Ignore a user/role/channel from using any commands.",
  usage: [
    "ignore [channel/role/user]"
  ],
  example: [
    "ignore #General"
  ],
  userPermissions: [
    "ADMINISTRATOR"
  ]
};
