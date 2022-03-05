const fs = require("fs");

module.exports = (client) => {
  let categories = fs.readdirSync(__dirname).filter(file => fs.statSync(`${__dirname}/${file}`).isDirectory());
  categories.forEach(category => {
    let getEvent = event => require(`./${category}/${event}.js`);

    fs.readdirSync(`${__dirname}/${category}`).forEach(event => {
      event = event.slice(0, -3);
      if (event === "ready") {
        client.on(event, () => getEvent(event)(client));
      } else {
        if (category == "discord") client.on(event, getEvent(event));
      }
    });
  });
};
