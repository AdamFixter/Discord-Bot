exports.check = (message) => {
  return /([\u0300-\u200F]|[\u2500-\u257F]|[\u29F8-\u29F9])/.test(message.content);
};

exports.config = {
  icon: ":symbols:",
  options: [
    { name: "response", values: {
      response: { type: "array", default: ["{user.mention}, don't post zalgo!"], guildSettings: true }
    }}
  ]
};
