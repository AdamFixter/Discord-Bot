exports.check = (message, options) => {
  let content = message.content;
  let isMulti = options.multi && /\`\`\`(.*?)\`\`\`/gms.test(content);
  let isSingle = options.single && /\`{1,2}?(\b.*?)\`{1,2}?/gm.test(content);
  return isSingle || isMulti ? (isMulti ? {type: "multi"} : {type: "single"}) : false;
};

exports.config = {
  icon: ":regional_indicator_c:",
  options: [
    { name: "single", values: {
      single: { type: "boolean", default: true }
    }},
    { name: "multi", values: {
      multi: { type: "boolean", default: true }
    }},
    { name: "response", values: {
      response: { type: "array", default: ["{user.mention}, {type} code blocks arn't allowed here."], cap: 5, guildSettings: true }
    }}
  ]
};
