const urlRegex = require("url-regex");

exports.check = (message, options, blacklist) => {
  if (urlRegex().test(message.content) && message.content.match(message.client.config.regex.invite) === null && !blacklist.some(elem => message.content.indexOf(elem.toLowerCase()) !== -1)) return true;
};

exports.config = {
  icon: ":link:",
  options: [
    { name: "response",  values: {
      response: { type: "array", default: ["{user.mention}, don't post links!"], guildSettings: true }
    }}
  ]
};
