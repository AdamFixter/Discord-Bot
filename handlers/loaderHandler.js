module.exports = (client, dir) => {
  require(`../${dir}/categoryLoader`)(client, "./handlers/commands/categories/", "commands");
  require(`../${dir}/categoryLoader`)(client, "./handlers/automod/checks/", "automod");
  require(`../${dir}/categoryLoader`)(client, "./handlers/logs/categories/", "logs");
  require(`../${dir}/handlerLoader`)(client, "./handlers/", "handlers");

  require(`../${dir}/modelLoader`)(client);
};
