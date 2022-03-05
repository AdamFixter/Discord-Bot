exports.run = (client, channel, message, args) => {
  let automod = message.guild.settings.automod;

  if (args.length < 1) return channel.send({embed: client.utility.message.createEmbed({
    title: "Automod",
    description: `Below are a list of events that AutoMod can automate. Use \`${message.prefix}automod [event]\` to enable/disable the events. Want to change a value below? Do \`${message.prefix}automod [event] [option] [value]\`, For more information do \`${message.prefix}help automod\``
  }).settings(client.automod).addCategories(automod, `\`${message.prefix}automod {0}\`\n[Hover for info](https://owlbot.gitbook.io/owlbot/ "{1}\n{2}/{3} enabled check(s).")`).build()});

  let check = args[0].toLowerCase();
  let categories = Object.keys(automod);
  //Check if check is a category/check.
  if (categories.includes(check)) return channel.send({embed: client.utility.message.createEmbed({
    title: "Automod",
    description: "desc"
  }).settings(client.automod).addOptions(message, check, automod).build()});

  let foundCategory  = categories.filter(category => automod[category][check]);
  if (foundCategory.length > 0) {
    let checkData = automod[foundCategory][check];
    if (args.length < 2) { //Toggle
      let enabled = checkData.enabled;
      checkData.enabled = !enabled;
      return channel.send({embed: client.utility.message.createEmbed({
        description: `${enabled ? "**Disabled**" : "**Enabled**"} ${check} auto modding.`,
        footer: {
          icon_url: message.author.avatarURL
        }
      }).build()});
    }
    let option = args[1].toLowerCase();
    if (Object.keys(checkData).slice(1).includes(option)) {
      let result = client.utility.validator.applyOption(client.automod.categories[foundCategory], automod[foundCategory], check, option, args.slice(2));
      if (result) return channel.send({embed: result});
    }
    //Update options
  }
  return false;
};

exports.config = {
  icon: ":robot:"
};
exports.help = {
  description: "Just be lazy and let the bot do the work for you. :)",
  usage: [
    "automod",
    "automod [event]",
    "automod [event] [option]",
    "automod [event] [option] [value]",
    "automod [event] blacklist [value/channel/role/user]"
  ],
  example: [
    "automod",
    "automod invites",
    "automod invites delete",
    "automod emojis amount 10",
    "automod links blacklist https://youtube.com",
    "automod links blacklist @ItsComits#3526"
  ]
};
