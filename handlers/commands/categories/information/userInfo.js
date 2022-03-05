const utility = require("../../../../utility");


exports.run = (client, channel, message, args) => {

  let user = utility.getUser(args[0], message.guild, false) || message.author;
  let member = utility.getUser(args[0], message.guild, true) || message.member;
  if (member.id !== user.id) member = false;
  let status = client.config.emojis.statuses[user.presence.status];

  let joined = member ? `\nJoined: ${utility.formatTime(member.joinedAt, "llll")} (#${(member.guild.members.sort((a, b) => a.joinedTimestamp - b.joinedTimestamp).keyArray().indexOf(user.id) + 1)})` : "";
  let fields = [{
    name: "» User",
    value: `ID: \`${user.id}\`\nProfile: ${user}\nStatus: ${utility.capitalise(user.presence.status)}${status}`,
    inline: true
  },{
    name: "» Account",
    value: `Created: ${utility.formatTime(user.createdAt, "llll")}${joined}`,
    inline: true
  }];

  if (member) {
    let role = member.roles.array();
    role.shift();
    fields.push({
      name: `» Roles (${role.length})`,
      value: `${role.length > 0 ? role.join(" ") : "No roles"}`,
      inline: true
    });
  }

  return channel.send({embed: {
    color: client.colors.defaultColor,
    author:  {
      name: `${user.tag} Info`,
      icon_url: user.displayAvatarURL
    },
    thumbnail: {
      url: user.displayAvatarURL,
    },
    fields: fields
  }});
};

exports.config = {
  icon: ":book:",
  aliases: [
    "whois",
    "user-info"
  ]
};

exports.help = {
  description: "Get information about a user.",
  usage: [
    "userinfo",
    "userinfo [userMention/userID]"
  ],
  example: [
    "userinfo",
    "userinfo @ItsComits#3526"
  ]
};
