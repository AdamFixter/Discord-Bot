module.exports = (message, cmd, args) => {
  console.log(`[COMMAND]: "${cmd.help.name} ${args.join(" ")}" executed by ${message.author.username}#${message.author.discriminator} (${message.guild.name} | ${message.guild.id})`);
  let client = message.client;
  client.ranCommands = client.ranCommands+1;
  client.log.send({embeds: [{
    color: 0xffffff,
    description: `[${client.ranCommands}] **${cmd.help.name} ${args.join(" ")}** executed by __${message.author.tag}__ (${message.author.id})`
  }]});
};
