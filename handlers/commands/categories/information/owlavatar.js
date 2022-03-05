const jimp = require("jimp");

exports.run = async (client, channel, message, args) => {
  let user = client.utility.validator.getUser(args[0]) || message.member.user;
  return channel.send({embed: {
      color: client.colors.defaultColor,
      author: {
        name: user.tag,
        icon_url: user.displayAvatarURL
      },
      image: {
        url: `attachment://${user.id}.png`
      },
    }, files: [{ attachment: await getBuffer(user, client.settings.images[0]), name: `${user.id}.png` }]
  });
};

function getBuffer(user, overlay) {
  return new Promise(function(resolve) {
    jimp.read(user.displayAvatarURL, async function(err, avatar) {
      if (err) throw err;
      avatar.scaleToFit(256, 256).mask(overlay, 0, 0).getBuffer(jimp.MIME_PNG, function(err, buffer) {
        if (err) throw err;
        resolve(buffer);
      });
    });
  });
}

exports.config = {
  icon: "<:greenOwl:500842335807078410>",
  aliases: [
    "owlav"
  ]
};

exports.help = {
  description: "Turn your avatar into Owl. Hoot! Hoot!",
  usage: [
    "owlAvatar",
    "owlAvatar [userMention/userID]"
  ],
  example: [
    "owlAvatar",
    "owlAvatar @ItsComits#3526"
  ],
  botPermissions: [
    "ATTACH_FILES"
  ]
};
