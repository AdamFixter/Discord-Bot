const fs = require("fs");
const path = require("path");
const lodash = require("lodash");

module.exports = (client, dir) => {
  client.logs = {};
  client.logs.categories = {};
  client.logs.config = require(`.${dir.slice(0, -11)}config.js`);

  let categories = fs.readdirSync(`${dir}`).filter(file => fs.statSync(path.join(`${dir}`, file)).isDirectory());

  for (let i = 0; i < categories.length; i++) {
    let category = categories[i];
    if (!client.logs.categories[category]) client.logs.categories[category] = lodash.merge({}, { icon: client.logs.config.categories.icon, enabled: false, description: "No description provided." }, client.logs.config.categories[category]);
    let logs = fs.readdirSync(`${dir}/${category}`);

    for (let log in logs) {
      log = logs[log].slice(0, -3).toLowerCase();
      let file = require(`.${dir}${category}/${log}`);
      file.config = lodash.merge({}, client.logs.config.config, file.config);
      client.logs.categories[category][log] = file;
    }
  }
};
