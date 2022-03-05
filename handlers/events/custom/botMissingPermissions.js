const utility = require("../../utility");

module.exports = async (message, permissions) => {
  permissions = permissions.map(perm => perm.replace(/_/g, " ").toLowerCase().split(" ").map(word => utility.capitalise(word)).join(" ")).join(", ");
  message.channel.send(`I currently don't have permissions to perform this command.\n${permissions}`).catch(e => {
    //Try to send the author a dm.
    message.author.send({embed: {
      color: message.client.config.colors.defaultColor,
      title: `Server: ${message.guild.name}`,
      description: `Looks like the server administrator(s) haven't gave me the permissions ${message.client.config.permissions.map(perm => `**${perm}**`).join(" & ")}. \nYou're best of pestering them to get this resolved. :)`
    }}).catch(e => {});
  });
};
