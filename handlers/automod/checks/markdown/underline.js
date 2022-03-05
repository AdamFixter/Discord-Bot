exports.check = (message, options) => {
  let characters = 0;
  let content = message.content;
  let matches = content.match(new RegExp(/__(\w+)__/gm));
  if (!matches) return false;
  matches.forEach(match => characters += match.slice(2, -2).length);

  return characters >= options.amount ? {amount: characters}: false;
};

exports.config = {
  icon: ":regional_indicator_u:",
  options: [
    { name: "amount", values: {
      amount: { type: "integer", default: 10, max: 2000, suffix: " character(s)" }
    }},
    { name: "response", values: {
      response: { type: "array", default: ["{user.mention}, Woah! underline text be gone."], cap: 5, guildSettings: true }
    }}
  ]
};
