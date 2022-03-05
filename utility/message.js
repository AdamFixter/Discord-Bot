const Discord = require("Discord.js");
module.exports = function(client) {
  return {
    createEmbed: function(data, attachment) {
      let embed = new Discord.RichEmbed(Object.assign({}, { color: client.colors.defaultColor }, data));
      return {
        settings: function(settings) {
          return {
            addCategories: function(categories, data, toggle) {
              Object.keys(categories).forEach(category => {
                let guildCategoryData = categories[category];
                let modules = Object.keys(guildCategoryData).slice(1);
                embed.addField(`${settings.categories[category].icon} ${category.toTitleCase()} ${toggle ? client.config.emojis.settings[guildCategoryData.enabled] : ""}`,
                  data.format([
                    category,
                    settings.categories[category].description,
                    modules.filter(module => guildCategoryData[module].enabled).length,
                    modules.length
                  ]),
                  true);
              });
              return this;
            },
            addOptions: function(message, category, guildSettings) {
              console.log("----- ADDING OPTIONS -----");
              let categoryData = guildSettings[category];
              Object.keys(categoryData).slice(1).forEach(module => {
                let moduleData = categoryData[module];
                let config = settings.categories[category][module].config;
                let data = "";

                config.options.forEach(option => {
                  console.log(option);
                });

                embed.addField(`${config.icon} ${module.toTitleCase()} ${client.config.emojis.settings[moduleData.enabled]}`, "hey", true);
              });
              console.log("-----------------------------------");
              return this;
            },
            addOptions1: function(message, category, guildSettings) {
              let categoryData = guildSettings[category];
              Object.keys(categoryData).slice(1).forEach(module => {
                let moduleData = categoryData[module];
                let config = settings.categories[category][module].config;
                let data = "";

                config.options.forEach(optionConfig => {
                  let optionName = optionConfig.name;
                  let values = Object.keys(optionConfig.values);
                  let format = optionConfig.format;
                  data = `${data}${optionName.toTitleCase()}: `;
                  let isSingle = values.length < 2;
                  console.log(optionConfig)
                  if (!format) {
                    values.forEach(option => {
                      let optionData = optionConfig.values[option];
                      console.log(moduleData[optionName]);
                      let value = client.utility.validator.validateOption(message, optionData.type, moduleData[optionName][option]);
                      data = `${data}${!isSingle ? `\n-   ${option}: ${value}` :`${value}\n`}`;
                    });
                  } else {
                    data = `${data}${format.replaceVariables(message, Object.assign({}, moduleData[optionName], {name: optionName}))}\n`;
                  }

                });
                embed.addField(`${config.icon} ${module.toTitleCase()} ${client.config.emojis.settings[moduleData.enabled]}`, data, true);
              });
              return this;
            },
            build: function() {
              return embed;
            }
          };
        },
        build: function() {
          return embed;
        }
      };
    }
  };
};
