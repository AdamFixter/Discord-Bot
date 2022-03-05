const moment = require("moment");

exports.run = async (client, channel, message, args) => {
  console.log("here")
  let guild = client.utility.validator.getGuild(args[0]) || message.guild;

  let total = {
    "online": {
      "all": 0,
      "bots": 0,
      "humans": 0,
      "nitro": 0
    },
    "all": 0,
    "bots": 0,
    "humans": 0,
    "nitro": 0
  }
  let channels = {
    "text": 0,
    "voice": 0,
    "category": 0
  }
  guild.members.forEach(m => {
    let user = m.user;
    let status = user.presence.status;
    let isBot = user.bot;
    let isNitro = user.avatarURL && user.avatarURL.endsWith(".gif");

    total.all++;
    isBot ? total.bots++ : total.humans++;
    if (isNitro) total.nitro++;

    if (total[status]) {
      total[status].all++;
      isBot ? total[status].bots++ : total[status].humans++;
      if (isNitro) total[status].nitro++;
    }
  });

  guild.channels.forEach(channel => {
    if (channel.type !== "dm" && channel.type !== "group") channels[channel.type]++;
  })
  return channel.send({embed: {
      color: client.colors.defaultColor,
      author: {
        name: `${guild.name} Server Info`,
        icon_url: guild.iconURL
      },
      thumbnail: {
        url: guild.iconURL ? `${guild.iconURL.substring(0, guild.iconURL.length - 3)}webp` : undefined
      },
      description: "",
      fields: [{
        name: "» Owner",
        value: `${guild.owner.user}\n`,
        inline: true
      },{
        name: "» Region",
        value: guild.region,
        inline: true
      },{
        name: `» Channels (${guild.channels.size})`,
        value: `**${channels.category}** Categories\n**${channels.text}** Text Channels\n**${channels.voice}** Voice Channels`,
        inline: true
      },{
        name: `» Users (${guild.memberCount})`,
        value: `Humans: **${total.online.humans}/${total.humans}**\nBots: **${total.online.bots}/${total.bots}**\nTotal: **${total.online.all}/${total.all}**\nNitro: **${total.online.nitro}/${total.nitro}**`,
        inline: true
      },{
        name: `» Roles (${message.guild.roles.size})`,
        value: `${guild.roles.map(role => role.name).join(", ")}`,
        inline: true
      }]/*,
      footer: {
        text: `ID: ${guild.id} | Server Created • ${utility.formatTime(guild.createdAt, "MM/DD/YYYY")}`
      }*/
    }
  });
};

exports.config = {
  icon: ":computer:",
  aliases: [
    "server-info"
  ]
};

exports.help = {
  description: " Get information about the server.",
  usage: [
    "serverinfo"
  ],
  example: [
    "serverinfo"
  ]
};
