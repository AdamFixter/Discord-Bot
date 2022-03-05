const jimp = require("jimp");

module.exports = async (client) => {
  await Promise.all([jimp.read("logoSelection.png")]).then(images => {
    client.settings.images = images;
  });
}
