const types = [/<#([0-9]+)>/g, /<@&[0-9]+>/g, /<@!?[0-9]+>/g];

exports.check = (message, options) => {
  let mentions = 0;
  types.forEach(type => {
    let match = message.content.match(type);
    if (match === null) return;
    mentions += match.length;
  });
  if (mentions >= options["amount"]) return true;
};

exports.config = {
  icon: ":bell:",
  options: [
    { name: "amount", values: {
      amount: { type: "integer", default: 5, suffix: " mention(s)" }
    }},
    { name: "response", values: {
      response: { type: "array", default: ["{user.mention}, don't post mentions!"], guildSettings: true }
    }}
  ]
};
