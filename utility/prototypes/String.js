const _ = require("lodash");

String.prototype.toTitleCase = function() {
  return this.toString().replace(/\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
};
String.prototype.format = function(array = []) {
  return this.toString().replace(/\{([0-9]+)\}/g, function (_, index) { return array[index]; });
};

String.prototype.autoComplete = function(array = []) {
  let string = this.toString();
  let matches = [];
  for (let i = 0; i < array.length; i++) {
    let match;
    for (let j = 0; j < string.length; j++) {
      if (array[i].toLowerCase().charAt(j) != string[j]) break;
      match = string[j];
    }
    if (match) matches.push(match);
  }
  return matches;
};
Object.byString = function(o, s) {
  s = s.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
  s = s.replace(/^\./, "");           // strip a leading dot
  var a = s.split(".");
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
};
String.prototype.replaceVariables = function(message, object = {}) {
  let string = this.toString();
  object = _.merge({}, object, {
    user: {
      id: message.author.id,
      tag: message.author.tag,
      discrim: message.author.discriminator,
      username: message.author.username,
      mention: message.author,
      status: message.author.status
    },
    server: {
      id: message.guild.id,
      name: message.guild.name,
      ownerid: message.guild.ownerID,
      isverified: message.guild.verified,
      membercount: message.guild.memberCount
    },
  });
  let matches = string.match(/{(.*?)}/gmi);
  if (matches) matches.forEach(match => string = string.replace(new RegExp(match, "gmi"), Object.byString(object, match.replace(/{/g, "").replace(/}/g, ""))));
  return string;
};
