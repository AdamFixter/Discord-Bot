exports.run = (client, channel, message, args) => {
  let commands = message.guild.settings.logs;

  if (args.length < 1) return channel.send({embed: client.utility.message.createEmbed({
    title: "Log",
    description: `Below are a list of events that can be logged. Use \`${message.prefix}log [event]\` to enable/disable the events. Want to change a value below? Do \`${message.prefix}log [event] [option] [value]\`, For more information do \`${message.prefix}help log\``,
    footer: {
      text: "If you're on mobile, click the hover button to see descriptions."
    }
  }).settings(client.logs)
    .addCategories(commands, `\`${message.prefix}test {0}\`\n[Hover for info](https://owlbot.gitbook.io/owlbot/ "{1}\n{2}/{3} logs enabled.")`, true)
    .build()});

  let check = args[0].toLowerCase();
  let categories = Object.keys(commands);
  //Check if check is a category/check.
  if (categories.includes(check)) return channel.send({embed: client.utility.message.createEmbed({
    title: `${check.toTitleCase()} Logs`,
    description: "Desc."
  }).settings(client.logs).addOptions(check, commands).build()});

  let foundCategory  = categories.filter(category => commands[category][check]);
  if (foundCategory.length > 0) {
    let checkData = commands[foundCategory][check];
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
      let result = client.utility.validator.applyOption(client.commands[foundCategory], commands[foundCategory], check, option, args.slice(2));
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
    "commands",
    "commands [event]",
    "commands [event] [option]",
    "commands [event] [option] [value]",
    "commands [event] blacklist [value/channel/role/user]"
  ],
  example: [
    "commands",
    "commands invites",
    "commands invites delete",
    "commands emojis amount 10",
    "commands links blacklist https://youtube.com",
    "commands links blacklist @ItsComits#3526"
  ]
};
