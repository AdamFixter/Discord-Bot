
module.exports = async (message, category, name, args) => {
  let client = message.client;
  let commands = client.commands.categories[category];
  let command = commands[name];

  if (!command.config.enabled) return message.channel.send(`The ${name.toTitleCase()} command is currently disabled :/`);
  if (!commands.enabled) return message.channel.send(`The ${category.toTitleCase()} category is currently disabled :/`);
  /*
    Per Guild Config
   */
  let guildCommands = message.guild.settings.commands[category];
  let guildCommand = guildCommands[name];
  if (!guildCommands.enabled || !guildCommand.enabled) return;

  //TODO: Check blacklist of command; Admins bypass;
  //Making sure the bot and the user have the required permissions.
  // if (!message.guild.me.hasPermission(command.help.botPermissions, false, true)) return message.client.emit("botMissingPermissions", message, command.help.botPermissions);
  // let isOwner = ["199250096062332929", "186135839867142144"].includes(message.author.id);
  // let hasPerms = message.member.hasPermission(command.help.userPermissions, false, true, true);
  // if (!hasPerms) {
  //   if (!isOwner) return;
  //   message.channel.send({embed: client.utility.message.createEmbed({ description: "Overriding permissions... Success. Be Careful. :wink:" }).build()});
  // }

  //Options
  //O
  client.handlers.options(message, command);
  let isDm = guildCommand.dm;
  let channel = isDm ? message.author : message.channel;

  if(guildCommand.delete && !isDm) message.delete().catch(e => {});

  let cooldown = command.config.options.cooldown;

  let userInCooldown = Object.keys(command.config.inCooldown).includes(message.author.id) ? command.config.inCooldown[message.author.id] : false;
  if (userInCooldown && userInCooldown.count >= cooldown.cap) {
    if (userInCooldown.start > Date.now()) return channel.send({embed: {
      color: client.colors.defaultColor,
      description: `Please wait \`${Math.round((userInCooldown.start - Date.now()) / 1000 * 10) / 10}\` seconds before using this command again.`
    }});
    delete command.config.inCooldown[message.author.id];
  }

  //Execute the command + log.
  let executed = await command.run(client, message.channel, message, args);
  let isObject = executed instanceof Object && !executed.channel;
  client.emit("log", message, command, args);
  if (!executed && !isObject) return client.emit("usage", channel, message, command.help);
  command.config.inCooldown[message.author.id] ? command.config.inCooldown[message.author.id].count = command.config.inCooldown[message.author.id].count+1 : command.config.inCooldown[message.author.id] = {start:  Date.now() + (cooldown.default) * 1000, count: 1};
  client.handlers.settings.save(message.guild);

  let responses = guildCommand.response;
  if (isObject && responses.length > 0) channel.send(responses[Math.floor(Math.random() * responses.length)].replaceVariables(executed, message)).then(msg => msg.delete(5000).catch(e => {}));
};
