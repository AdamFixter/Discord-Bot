module.exports = {
  prefixes: ["+"],
  categories: {
    icon: ":black_large_square:",
    information: { icon: ":books:", enabled: true, description: "Your personal tour guide awaits." },
    moderation: { icon: ":shield:", enabled: true, description: "Haters gonna hate." },
    settings: { icon: ":gear:", enabled: true, description: "Do you know what really grinds my gears?"},
  },
  config: {
    enabled: true,
    icon: ":black_large_square:",
    inCooldown: {},
    aliases: [],
    options: [
      { whitelist: { type: "array", default: [], cap: 5 }},
      { blacklist: { type: "array", default: [], cap: 5 }},
      { aliases: { type: "array", default: [], cap: 5 }},
      { cooldown: { type: "integer", default: 3 }},
      { delete: { type: "boolean", default: true}},
      { dm: { type: "boolean", default: false}}
    ]
  },
  help: {
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    description: "No description set",
    usage: ["No usage set"],
    example: ["No example set"]
  }
};
