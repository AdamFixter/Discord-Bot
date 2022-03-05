const moment = require("moment");

module.exports = async (client) => {
  client.ranCommands = 0;
  client.start = moment().valueOf();
  client.user.setActivity("+help | +invite");

  await client.fetchWebhook("513201416056078337", "WmModagOGHCnBGATyw_T7yY9yg45xIOSQtxGxCB82OpVT0SUoh_Fx45XOsx0xu-L-5y1").then(webhook => {
    webhook.send({embeds: [{
      color: 0xffffff,
      description: `**[STARTED]** Currently connected to **${client.guilds.size}** guilds with a total of __${client.users.size}__ users.`
    }]});
    client.log = webhook;
  }).catch(console.err);

  console.log(`[STARTED] Currently connected to ${client.guilds.size} guilds with a total of ${client.users.size} users.`)
};
