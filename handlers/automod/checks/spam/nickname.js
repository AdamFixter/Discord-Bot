exports.check = (message, options) => {
  return false;
};
exports.config = {
  icon: ":label:",
  options: [
    { name: "names", values: {
      names: { type: "array", default: [], cap: 15 }
    }}
  ]
};
