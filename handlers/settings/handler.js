const merge = require("deepmerge");
const Canvas = require("canvas");

module.exports = {
  get: function(guild) {
    if (!guild["settings"]) {
      let model = JSON.parse(JSON.stringify(guild.client.models.guild));
      if (guild.client.database.has(guild.id)) {
        guild["settings"] = merge.all([model, guild.client.database.get(guild.id)]);
      } else {
        guild["settings"] = model;
      }
    }
    return guild["settings"];
  },
  save: async function(message) {
    let bytesUsed = this.getBytesUsed(message.guild);
    let onePercent = message.client.config.memory.maxBytes / 100;

    if (this.getBytesFree(message.guild) <= 0) return message.channel.send({embed: {
        title: "[ALERT] MEMORY LIMIT REACHED!!",
        color: bytesUsed < (52 * onePercent) ? message.client.colors.yellow : (bytesUsed < (95 * onePercent) ? message.client.colors.orange : message.client.colors.red),
        image: {
          url: `attachment://${message.guild.id}.png`
        }
      }, files: [{ attachment: message.client.handlers.settings.getMemoryBar(message.guild), name: `${message.guild.id}.png`}]
    });
    let differences = await message.client.utility.object.deepDiff.getObjectDifferences(message.client.models.guild, message.guild.settings);
    if (Object.keys(differences).length > 0) message.client.database.set(message.guild.id, differences);
  },
  getBytesUsed: function(guild) {
    return (JSON.stringify(guild.settings).length - JSON.stringify(guild.client.models.guild).length) * 40;
  },
  getBytesFree: function(guild) {
    return guild.client.config.memory.maxBytes - this.getBytesUsed(guild);
  },
  getMemoryBar: function(guild) {
    let bytesUsed = this.getBytesUsed(guild);
    let canvas = Canvas.createCanvas(400, 17.5);
    let width = canvas.width;
    let height = canvas.height;

    let ctx = canvas.getContext("2d");
    var grd = ctx.createLinearGradient(0, 0, width, 0);
    grd.addColorStop(0, `#${guild.client.colors.yellow.toString(16)}`); //15184918
    grd.addColorStop(0.52, `#${guild.client.colors.orange.toString(16)}`); //14383915
    grd.addColorStop(0.95, `#${guild.client.colors.red.toString(16)}`); //13382194
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#000000";
    ctx.globalAlpha = 0.15;
    ctx.fillRect(0, height / 2, width, height); //Opacity

    ctx.fillStyle = "#2C2F33";
    ctx.globalAlpha = 1;
    let freeSpace = bytesUsed / (guild.client.config.memory.maxBytes / width);
    ctx.fillRect(freeSpace, 0, guild.client.config.memory.maxBytes, height);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 14px Helvetica Neue, Helvetica, Arial, sans-serif";
    ctx.textBaseline = "middle";
    ctx.fillText(`${bytesUsed.toLocaleString()} / ${guild.client.config.memory.maxBytes.toLocaleString()}`, 10, height/2);
    return canvas.toBuffer();
  }
};
