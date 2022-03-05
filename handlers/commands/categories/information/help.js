exports.run = (client, channel, message, args) => {

  let settings = message.guild.settings;
  let command = args.length > 0 ? args[0].toLowerCase() : false;
  let description = `This is the help page. Use \`${message.prefix}help [Command or Category]\` to get extra information about a command. Below are a list of commands.\n`;

  let categories = Object.keys(client.commands.categories);
  for (let i = 0; i < categories.length; i++) {
    let category = categories[i];
    let commands = Object.keys(client.commands.categories[category]).slice(3);

    if (!command) {
      description = description + `\n${client.commands.categories[category].icon}**${category.toTitleCase()}:**\n\`${commands.join(", ")}\``;
      continue;
    }
    if (command === category) return channel.send({embed: buildCategoryDescription(client, category, commands)});
    if (commands.includes(command)) return channel.send({embed: buildCommandDescription(client, category, client.commands[category][command])});
  }
  if (!command) {
    description = description + `\n\nHave an idea/bug that you would want to share with us or are you just in need of some extra help. Documentation can be viewed [here](https://owlbot.gitbook.io/owlbot/) or join our support server [here](${client.config.social.support}).\nWant me on your discord server? [Click here](${client.config.social.invite})`;
    return channel.send({embed: {
      color: client.colors.defaultColor,
      author: {
        name: "Help Page",
        icon_url: client.user.displayAvatarURL
      },
      description: description,
      timestamp: new Date(),
      footer: {
        text: "Don't include [] in your command."
      }
    }});
  }
  return channel.send(`Can't seem to find that command or category. Maybe try doing ${settings.prefix}help?`);
};


function buildCategoryDescription(client, category, commands) {
  return {
    color: client.colors.defaultColor,
    author: {
      name: `${category.toTitleCase()} Overview`,
      icon_url: client.user.displayAvatarURL
    },
    fields: [{
      name: "Commands in this category",
      value: commands.join(", "),
      inline: true
    }]
  };
}
function buildCommandDescription(client, category, command) {
  let format= (text, path) => `\n**${text}:**\n  \`${path}\``;
  let usage = format("Usage", command.help.usage.join("\n"));
  let example = format("Example", command.help.example.join("\n"));
  let cooldown = format("Cooldown", command.config.options.cooldown.default) + `${command.config.options.cooldown.suffix}`;
  category = format("Category", category);
  let aliases = format("Aliases", command.config.aliases.length > 0 ? command.config.aliases.join("\n") : "None");
  let botPerms = format("Bot Permission(s)", command.help.botPermissions.length > 0 ? command.help.botPermissions.join("\n") : "None");
  let userPerms = format("User permission(s)", command.help.userPermissions.length > 0 ? command.help.userPermissions.join("\n") : "None");
  return {
    color: client.colors.defaultColor,
    author: {
      name: `${command.help.name.toTitleCase()} Command`,
      icon_url: client.user.displayAvatarURL
    },
    description: `${command.help.description}${usage}${example}${cooldown}${category}${aliases}${botPerms}${userPerms}`,
    timestamp: new Date(),
    footer: {
      text: "Don't include [] in your command."
    }
  };
}

exports.config = {
  icon: ":sos:",
  aliases: [
    "commands"
  ]
};

exports.help = {
  description: "Get information regarding the bot",
  usage: [
    "help [command name]"
  ],
  example: [
    "help"
  ]
};
