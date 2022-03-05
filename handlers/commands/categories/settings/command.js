exports.run = (client, channel, message, args) => {
  let commands = message.guild.settings.commands;

  if (args.length < 1) return channel.send({embed: client.utility.message.createEmbed({
    title: "Command",
    description: `Below is an overview of all of the categories with the number of commands which are enabled/disabled. To enable/disable a command do \`${message.prefix}command [command]\`. You see something that needs changing then do \`${message.prefix}command [command] [option] [value]\`.`
  }).settings(client.commands).addCategories(commands, `\`${message.prefix}command {0}\`\n[Hover for info](https://owlbot.gitbook.io/owlbot/ "{1}\n{2}/{3} command(s) enabled.")`).build()});

  let check = args[0].toLowerCase();
  let categories = Object.keys(commands);
  //Check if check is a category/check.
  if (categories.includes(check)) return channel.send({embed: client.utility.message.createEmbed({
    title: "Command",
    description: `Woah, when you thought it couldn't get any better. You can now change each value per command so every command can be special. All you need to do is use \`${message.prefix}command [command] [option] [value]\` to change a value for a command. How cool is that?`
  }).settings(client.commands).addOptions(message, check, commands).build()});

  let foundCategory  = categories.filter(category => commands[category][check]);
  if (foundCategory.length > 0) {
    let checkData = commands[foundCategory][check];
    if (args.length < 2) { //Toggle
      let enabled = checkData.enabled;
      checkData.enabled = !enabled;
      return channel.send({embed: client.utility.message.createEmbed({
        description: `${enabled ? "**Disabled**" : "**Enabled**"} ${check} command.`,
        footer: {
          icon_url: message.author.avatarURL
        }
      }).build()});
    }
    let option = args[1].toLowerCase();
    if (Object.keys(checkData).slice(1).includes(option)) {
      let result = client.utility.validator.applyOption(client.commands.categories[foundCategory], commands[foundCategory], check, option, args.slice(2));
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
