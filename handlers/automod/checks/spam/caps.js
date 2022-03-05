exports.check = (message, options) => {
  let content = message.content.replace(" ", "") || content;
  if (content.length >= options["amount"] && content.replace(/[^A-Z]/g, "").length >= options["percentage"] / 100 * content.length) return true;
};

exports.config = {
  icon: ":regional_indicator_a:",
  options: [
    { name: "percentage", values: {
      percentage: { type: "integer", default: 70, min: 1, max: 100, suffix: "%" }
    }},
    { name: "amount", values: {
      amount: { type: "integer", default: 12, suffix: " character(s)" }
    }},
    { name: "response", values: {
      response: { type: "array", default: ["{user.mention}, too many caps!"], guildSettings: true }
    }}
  ]
};
