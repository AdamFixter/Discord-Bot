exports.check = (message, options) => {
  let italics = 0;
  let content = message.content;
  let match = content.match(new RegExp(/\*(.*?)\*/gm));

  if (match) {
    italics += match.length;
    match.forEach(spoiler => content.replace(italics, content.slice(2, -2)));
  }

  return italics > options.amount ? {amount: italics}: false;
};


exports.config = {
  icon: ":regional_indicator_i:",
  options: [
    { name: "amount", values: {
      amount: { type: "integer", default: 10, max: 2000 }
    }},
    { name: "response", values: {
      response: { type: "array", default: ["{user.mention}, Woah! italics text be gone."], cap: 5, guildSettings: true }
    }}
  ]
};
