const fs = require("fs");
const path = require("path");
const merge = require("deepmerge");

module.exports = (client, dir, key) => {
  client[key] = {};
  client[key].categories = {};
  client[key].config = require(`.${dir}config.js`);

  let categories = fs.readdirSync(`${dir}`).filter(file => fs.statSync(path.join(`${dir}`, file)).isDirectory());
  for (let i = 0; i < categories.length; i++) {
    let category = categories[i];
    if (!client[key].categories[category]) client[key].categories[category] = merge.all([{ icon: client[key].config.categories.icon, enabled: false, description: "No description provided." }, client[key].config.categories[category]]);
    let checks = fs.readdirSync(`${dir}/${category}`);

    for (let check in checks) {
      check = checks[check].slice(0, -3).toLowerCase();
      let file = require(`.${dir}${category}/${check}`);
      file.config = merge.all([client[key].config.config, file.config]);
      client[key].categories[category][check] = file;
    }
  }
};
