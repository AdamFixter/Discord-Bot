const fs = require("fs");

module.exports = (client, dir) => {
  fs.readdirSync(`./${dir}/prototypes`).forEach(file => require(`../${dir}/prototypes/${file}`));

  let utility = {};
  fs.readdirSync(`${dir}`).filter(file => !fs.lstatSync(`${dir}/${file}`).isDirectory()).forEach(file => {
    let fileName = file.substring(0, file.length - 3);
    utility[fileName] = require(`../${dir}/${fileName}`)(client);
  });
  client.utility = utility;
};
