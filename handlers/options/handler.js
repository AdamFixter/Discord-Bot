module.exports = (message, command) => {
  let options = command.config.options;
  options.forEach(option => {
    switch(Object.keys(option)[0]) {
      case "cooldown":

        break;
      default:
    }
  });
};
