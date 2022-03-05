const fs = require("fs");
const path = require("path");

module.exports = (client, dir) => {
  client.handlers = {};
  fs.readdirSync(`${dir}`).filter(file => fs.statSync(path.join(`${dir}`, file)).isDirectory()).forEach(handler => {
    fs.access(`./${dir}${handler}/start.js`, fs.F_OK, (err) => {
      if (!err) require(`.${dir}${handler}/start`)(client);
    });
    fs.access(`./${dir}${handler}/handler.js`, fs.F_OK, (err) => {
      if (!err) client.handlers[handler] = require(`.${dir}${handler}/handler`);
    });
  });
};
