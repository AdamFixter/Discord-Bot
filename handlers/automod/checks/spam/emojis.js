const emojiRegex = require("emoji-regex");

exports.check = (message, options) => {
  let emojis = 0;

  let customMatch = message.content.match(/<a?:(\w+):(\d+)>/g);
  if (customMatch !== null) emojis += customMatch.length;

  let emojiMatch = message.content.match(emojiRegex());
  if (emojiMatch !== null) emojis += emojiMatch.length;

  if (emojis >= options["amount"]) return true;
};

exports.config = {
  icon: ":smiley:",
  options: [
    { name: "amount", values: {
      amount: { type: "integer", default: 5, suffix: " emoji(s)" }
    }},
    { name: "response", values: {
      response: { type: "array", default: ["{user.mention}, too many emojis!"], guildSettings: true }
    }}
  ]
};
