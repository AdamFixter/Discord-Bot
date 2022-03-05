exports.check = (message, options, blacklist) => {
  if (message.content.match(message.client.config.regex.invite) !== null && !blacklist.some(elem => message.content.indexOf(elem.toLowerCase()) !== -1)) return true;
};

exports.config = {
  icon: ":envelope:",
  options: [
    { name: "response",  values: {
      response: { type: "array", default: ["{user.mention}, don't post invites!"], cap: 5 }
    }},
    { name: "cooldown", format: "**{time}** second(s) for every **{amount}** {name}", values: {
      time: { type: "integer", default: 5 },
      amount: { type: "integer", default: 3 }
    }}
  ]
};
