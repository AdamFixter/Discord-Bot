exports.check = (message, options) => {
  let duplication = options["amount"]-1;
  let regex = new RegExp("(|^)(.+)\\2{" + duplication + ",}", "gmi");
  if (message.content.match(regex)) return true;
};

exports.config = {
  icon: ":abc:",
  options: [
    { name: "duplicates", values: {
      duplicates: { type: "integer", default: 8, suffix: " word(s)/character(s)" }
    }},
    { name: "response", values: {
      response: { type: "array", default: ["{user.mention}, don't spam!"], guildSettings: true }
    }}
  ]
};
