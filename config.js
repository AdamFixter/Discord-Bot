module.exports = {
  memory: {
    maxBytes: 100000
  },
  emojis: {
    settings: {
      true: "<:enabled:479438044798124051>",
      false: "<:disabled:479437891521609739>"
    },
    statuses: {
      online: "<:online:442426114111963168>",
      dnd: "<:dnd:442426114028077067>",
      idle: "<:idle:442426114099511338>",
      offline: "<:offline:477999327000657940>"
    }
  },
  timers: {
    guild: {
      autoSave: 3600000, //1 hour //UNHEALTHY
      fetchMembers: 3600000 //1 Hour
    }
  },
  prefix: ["+"],
  permissions: [
    "SEND_MESSAGES",
    "EMBED_LINKS"
  ],
  //
  social: {
    invite: "https://discordapp.com/oauth2/authorize?client_id=442098528123224075&scope=bot&permissions=805694550",
    support: "https://discord.gg/z5hbt7m",
    vote: "https://discordbots.org/bot/442098528123224075/vote"
  },
  //
  regex: {
    invite: new RegExp("(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]", "gmi")
  }
};
