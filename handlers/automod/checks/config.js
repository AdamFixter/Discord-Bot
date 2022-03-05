module.exports = {
  categories: {
    icon: ":black_large_square:",
    advert: { icon: ":envelope:", enabled: true, description: "Advert, You shall not PASS!" },
    markdown: { icon: ":writing_hand:", enabled: true, description: "Bold, Italics, Underline, Pfft you wish." },
    spam: { icon: ":abc: ", enabled: true, description: "Sppppppaaaaammmmm. Just No ;)" }
  },
  config: {
    enabled: true,
    icon: ":black_large_square:",
    options: [
      { whitelist: { type: "array", default: [], cap: 5 }},
      { blacklist: { type: "array", default: [], cap: 5 }},
      { delete: { type: "boolean", default: true}},
      { dm: { type: "boolean", default: false}},
      { cooldown: { format: "**{time}** second(s) for every {amount} {module}.", values: {
        time: { type: "integer", default: 1},
        amount: { type: "integer", default: 5}
      }}},
    ]
  }
};
