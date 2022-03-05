const discord = require("discord.js");
const utility = require("../../utility");
const settingsHandler = require("../../handlers/settingsHandler");
const webhookHandler = require("../../handlers/webhookHandler");

module.exports = async (guild, action, audit, data) => {
  let settings = settingsHandler.get(guild);
  if (!settings.commands.settings.log.enabled) return; //Command is disabled.

  let webhook = await webhookHandler.getEventHook(guild, action);
  if (!webhook) return; //Action isn't enabled :/

  let client = guild.client;

  let guildMember = guild.members.get(client.user.id);
  if (!guildMember) await guild.fetchMember(guild.user, true).catch(console.error);
  if (!guildMember.hasPermission(client.commands.get("log").help.botPermissions)) return; //Make sure the bot has the correct permissions (After Restart).

  var types = guild.client.logs;

  if (audit) { //Imagine if audit logs were reliable.
    guild.fetchAuditLogs({type: types[action].auditAction}).then(logs => {
      let entry = logs.entries.first();
      if (entry && Date.now() - entry.createdTimestamp < 9000) {
        action = Object.keys(types).find(type => types[type].auditAction === entry.action);
        return data.unshift(entry);
      }
    }).catch(e => {});
  }

  var type = types[action];
  let author = data[0];
  let template = {
    color: guild.client.colors.defaultColor,
    author: {},
    thumbnail: {},
    fields: [],
    timestamp: new Date(),
    footer: {
      text: `${author ? `ID: ${author.id}` : ""}`
    }
  }
  let dmData = {
    color: guild.client.colors.defaultColor
  };

  switch(action) {
    case "ban": case "kick": case "mute": case "unban": case "unmute":
        { //Author, Target, Reason, Length
          let target = data[1];
          let duration = data[3] ? utility.formatMilliseconds(data[3]) : "";
          let reason = data[2];
          template.author.name = `${type.action} | ${target.tag}`,
          template.color = guild.client.colors.red;
          template.fields.push({
            name: "Staff Member:",
            value: `${author}`,
            inline: true
          },{
            name: "User:",
            value: `${data[1]}`,
            inline: true
          });
          if (duration) {
            template.fields.push({
              name: "Duration:",
              value: duration,
              inline: true
            });
          }
          if (reason) {
            template.fields.push({
              name: "Reason:",
              value: `\`\`\`\n${reason}\`\`\``,
              inline: false
            });
          }
          if (action !== "unban") {
            dmData.description = `You have been ${types[action].action.toLowerCase()} from **${guild.name}**!${duration ? `\n**Duration:** ${duration}` : ""}${reason ? `\n**Reason:** ${reason}` : ""}`;
          }
          break;
        }
    case "purge":
        { //Author, Type, Amount, Channel
          template.author.name = `${type.action} | ${data[0].tag}`,
          template.color = guild.client.colors.orange;
          template.fields = [{
            name: "Staff Member:",
            value: `${data[0]}`,
            inline: true
          },{
            name: "About:",
            value: `${isNaN(data[1]) ? utility.capitalise(data[1]) : "All"} | ${data[2]} messages`,
            inline: true
          },{
            name: "Channel:",
            value: `${data[3]}`,
            inline: true
          }];
          break;
        }
    case "suggestion":
        { //Author, Idea
          template.author.name = `${data[0].tag}\'s Suggestion`;
          template.description = `${data[1]}`;
          template.thumbnail.url = author.displayAvatarURL;
          template.color = guild.client.colors.defaultColor;
          break;
        }
    case "report":
        { //Author, Reporter, Target, Reason
          template.author.name = `Reported ${data[1].username}#${data[1].discriminator}`;
          template.color = guild.client.colors.defaultColor;
          template.fields = [{
              name: "Reporter:",
              value: `${data[0]}`,
              inline: true
            },{
              name: "Reported:",
              value: `${data[1]}`,
              inline: true
            },{
              name: "Reason:",
              value: `\`\`\`\n${data[2]}\`\`\``,
              inline: false
            }];
          break;
        }
    case "voiceswitch":
        {
          template.author.name = `${type.action} | ${data[0].tag}`,
          template.color = guild.client.colors.orange;
          template.fields = [{
            name: "From:",
            value: data[1].name,
            inline: true
          },{
            name: "To:",
            value: data[2].name,
            inline: true
          }];
          break;
        }
    case "voicejoin": case "voiceleave":
        {
          template.author.name = `${type.action} | ${data[0].tag}`,
          template.color = action === "voiceleave" ? guild.client.colors.red : guild.client.colors.green;
          template.fields = [{
            name: `Channel:`,
            value: data[1].name,
            inline: true
          },{
            name: "ID:",
            value: `\`${data[1].id}\``,
            inline: true
          }];
          break;
        }
    case "channeldelete": case "channelcreate":
        { //Channel
          template.author.name = type.action
          template.color = action === "channeldelete" ? guild.client.colors.red : guild.client.colors.green;
          template.fields = [{
            name: `Name:`,
            value: `${type === "Text" && action !== "channeldelete" ? data[0] : data[0].name}`,
            inline: true
          },{
            name: "Type:",
            value: `${utility.capitalise(data[0].type)}`,
            inline: true
          }];
          break;
        }
    case "roledelete": case "rolecreate":
        { //Role
          template.author.name = type.action
          template.color = action === "roledelete" ? guild.client.colors.red : guild.client.colors.green;
          template.fields = [{
            name: "Name:",
            value: `${action !== "roledelete" ? data[0] : data[0].name}`,
            inline: true
          },{
            name: "ID:",
            value: data[0].id,
            inline: true
          }]
          break;
        }
    case "emojidelete": case "emojicreate":
        { //Emoji
          template.author.name = type.action
          template.color = action === "emojidelete" ? guild.client.colors.red : guild.client.colors.green;
          template.fields = [{
            name: "Emoji:",
            value: `${data[0]}`,
            inline: true
          },{
            name: "Type:",
            value: data[0].animated ? "Animated" : "Still",
            inline: true
          }];
          break;
        }
    case "messageedit": case "nickname":
        { //Author, Old, New
          template.author.name = `${type.action} | ${data[0].tag}`,
          template.color = guild.client.colors.orange;
          template.fields = [{
            name: "Before:",
            value: data[1] ? data[1] : "None",
            inline: true
          },{
            name: "After:",
            value: data[2] ? data[2] : "None",
            inline: true
          }];
          break;
        }
    case "memberjoin": case "memberleave":
        { //User
          template.author.name = `${type.action} | ${data[0].username}#${data[0].discriminator}`,
          template.author.icon_url = data[0].displayAvatarURL;
          template.timestamp = new Date();
          template.color = action === "memberjoin" ? guild.client.colors.green : guild.client.colors.red;
          break;
        }
    case "messagedelete": case "invites": case "links": case "caps": case "mentions": case "emojis": case "spam": case "zalgo":
        { //Author, Contents
          template.author.name = `${types[action].action} Deleted | ${data[0].username}#${data[0].discriminator}`;
          template.description = `ID: \`${data[1].id}\`\nAuthor: ${data[0]}\nChannel: ${data[1].channel}`;
          template.color = guild.client.colors.red;
          template.fields.push({
            name: "Contents:",
            value: `${data[1].content}`,
            inline: false
          });
        }
    default:
  }

  webhook.send({embeds: [template]}).then(m => {
    if (action === "suggestion") {
      m.react('500702494557470730').then(() => m.react('500702494851203072').then(() => m.react('🤷')));
    }
  });

  if (dmData.description) {
    try {
      data[1].send({embed: dmData})
    } catch (e) {
    }
  }
};
