const rolePrefixes = ["+", "-"];
module.exports = function(client) {
  return {
    validateOption: function(message, type, value) {
      switch(type) {
        case "array":
          value = value.length > 0 ? value.map(i => `\n- \`${i}\``).join("") : "**None**";
          break;
        case "boolean":
          value = (`**${value ? "Yes" : "No"}**`);
          break;
        case "string":
          value = !value ? "**None**" : value;
          break;
        default:
          value = `**${value}**`;
      }
      return value;
    },
    applyOption: function(categories, guildSettings, check, option, args) {
      let optionData = categories[check].config.options[option];
      let guildValue = guildSettings[check][option];
      let hasValue = args.length > 0;

      switch(optionData.type) {
      case "string":
          {
            if (!hasValue) {
              let enabled = guildSettings[check][option] != "";
              guildSettings[check][option] = enabled ? "" : optionData.default;
              return client.utility.message.createEmbed({
                description: `${enabled ? "**Disabled**" : "**Enabled**"} ${option} for ${check}.`
              }).build();
            };
            let value = args.join(" ");
            guildSettings[check][option] = value;
            return client.utility.message.createEmbed({
              description: `**Updated** ${option} for ${check} to \`${value}\`${optionData.suffix || ""}.`
            }).build();
          }
      case "integer":
          {
            if (!hasValue) return false;
            let value = args[0];
            if (isNaN(value)) return client.utility.message.createEmbed({
              description: `The value must be a number`
            }).build();

            let min = optionData.min || 0;
            let max = optionData.max || 60;
            if (value < min || value > max) return client.utility.message.createEmbed({
              description: `The value can only be between ${min} - ${max}.`
            }).build();

            guildSettings[check][option] = value;
            return client.utility.message.createEmbed({
              description: `**Updated** ${option} for ${check} to \`${value}\`${optionData.suffix || ""}.`
            }).build();
            break;
          }
      case "boolean":
          {
            guildValue = hasValue ? args[0].toLowerCase() == "yes" : !guildValue;
            guildSettings[check][option] = guildValue;
            return client.utility.message.createEmbed({
              description: `${guildValue ? "**Enabled**" : "**Disabled**"} ${option} for ${check}.`,
            }).build();
          }
      case "array":
          {
            if (args.length < 1) return false;
            let array = guildSettings[check][option];
            if (array.length >= optionData.cap) return `OOPS, Looks like you have hit the limit (${array.length}).`;

            let value = args.join(" ");
            let exists = array.includes(value);

            exists ? guildSettings[check][option].splice(array.indexOf(value), 1) : guildSettings[check][option].push(value);
            return client.utility.message.createEmbed({
              description: `${exists ? "**Removed**" : "**Added**"} ${value}`
            }).build();
          }
      default:
        console.log(`[Utility | Validator | applyOption]: \`${optionData.type}\` doesn't exist.`);
      }
    },
    /**
     * Validates role(s) and checks whether they include a prefix or not.
     * @param  {string} possibleRoles - A string of roles..
     * @param  {Object} guild - The guild object.
     * @param  {Boolean} includesPrefix - Represents if any of the roles could include a prefix
     * @return {Object} - found prefixes/roles & invalid roles.
     */
    getRoles: function(possibleRoles, guild, includesPrefix) {
      let prefixes = [];
      let foundRoles = [];
      let invalidRoles = [];

      possibleRoles.split(",").forEach(role => {
        role = role.trim();

        let prefix = role.charAt(0);
        let hasPrefix = rolePrefixes.includes(prefix);
        if (includesPrefix && hasPrefix) {
          prefixes.push(prefix);
          role.substring(1);
        }
        let autocomplete = role.autoComplete(guild.roles.map(role => role.name))[0];
        let foundRole = guild.roles.get(role.match(/(\d+)/g)[0]) || guild.roles.find(role => role.name === autocomplete);
        foundRole ? foundRoles.push(foundRole) : invalidRoles.push(hasPrefix ? role.substring(1) : role);

        return {
          prefix: prefixes,
          foundRoles: foundRoles,
          invalidRoles: invalidRoles
        };
      });
    },
    /**
     * Gets a channel a given string in the current guild.
     * @param  {String} channel - Channel string.
     * @param  {Object} channels - An object of channel objects..
     * @return {Channel} - Returns the Channel.
     */
    getChannel: function(channel, channels = client.channels) {
      let id = channel ? channel.match(/(\d+)/g) : "";
      if (!id) return false;
      return channels.get(id[0]) || false;
    },
    /**
     * Gets a user or guildMember
     * @param  {String} user - User string.
     * @param  {Object} members - An object of guild members.
     * @return {ClientUser || GuildMember} - Returns either the GuildMeber or the clientUser.
     */
    getUser: function(user, members = client.users) {
      let id = user ? user.match(/(\d+)/g) : "";
      if (!id) return false;
      return members.get(id[0]) || false;
    },
    /**
     * Tranlsates the given string into a user object(s).
     * @param {String} users - Users string.
     * @param {Guild | Client} collection - The guild or client object.
     * @return {Object} - The user object.
     */
    getUsers: function(users, members = client.users) {
      let foundUsers = [];
      let invalidUsers = [];

      users.split(",").forEach(user => {
        user = user.trim();
        let foundUser = members.get(user.match(/(\d+)/g)[0]);
        foundUser ? foundUsers.push(foundUser) : invalidUsers.push(user);
      });
      return {
        users: foundUsers,
        invalidUsers: invalidUsers
      };
    },
    getGuild: function(id) {
      return client.guilds.get(id) || false;
    }
  };
};
