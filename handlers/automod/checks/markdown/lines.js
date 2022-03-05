exports.check = (message, options) => {
  return false;
};
exports.config = {
  icon: ":notepad_spiral:",
  options: [
    { name: "amount", values: {
      amount: { type: "number", default: 3 }
    }},
    { name: "response", values: {
      response: { type: "array", default: ["Woah, Way to many lines. :/"], guildSettings: true }
    }}
  ]
};
