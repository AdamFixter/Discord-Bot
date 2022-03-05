module.exports = async (message) => {
  if (message.author.bot || message.channel.type !== "text" || !message.guild.available) return;
  if (message.member === null) message.member = await message.guild.fetchMember(message.author, false);

  let client = message.client;
  let settings = await client.handlers.settings.get(message.guild);
  client.handlers.timers.getGuildData(message.guild);

  let prefix = settings.prefixes.filter(string => message.content.toLowerCase().startsWith(string.toLowerCase()));

  //Message might be containing a command.
  if (prefix.length !== 0) {
    let args = message.content.slice(prefix[0].length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();

    Object.keys(client.commands.categories).forEach(category => {
      commands = client.commands.categories[category];
      Object.keys(commands).forEach(cmd => {
        if (!commands[cmd].config) return;
        if (cmd === command || commands[cmd].config.aliases.includes(command)) {
          message.prefix = prefix[0];
          return client.handlers.commands(message, category, command, args);
        }
      });
    });
  }

  await client.handlers.automod(message);
};
