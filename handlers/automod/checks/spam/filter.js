exports.check = (message, options) => {
  if (options.swears && options.swears.length > 0) {
    let match = message.content.match(new RegExp(`\\b${options.swears.join("|")}\\b`, "gm"));
    if (match) message.channel.send(`${match}: ${message.content}`);

  }
  return false;
};
exports.config = {
  icon: ":no_entry:",
  options: [
    { name: "response", values: {
      response: { type: "array", default: ["{user.mention}, Watch your language."], cap: 5, guildSettings: true }
    }},
    { name: "swears", values: {
      swears: { type: "array", default: [], cap: 15 }
    }}
  ]
};
