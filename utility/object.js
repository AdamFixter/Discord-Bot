const _ = require("lodash");
module.exports = (client) => {
  return {
    deepDiff: function() {
      return {
      /*
      * returns the difference of 2 objects as a new object.
      * Favours obj 2 as this object will be updated more.
      */
        getObjectDifferences: function(obj1, obj2) {
          if (this.isValue(obj1) || this.isValue(obj2)) {
            return obj2 ? obj2 : obj1;
          }

          let diff = {};
          Object.keys(obj2).forEach(key => {
            let old = obj1[key];
            let updated = obj2[key];

            switch(true) {
            case this.isArray(old) && this.isArray(updated):
              if (!this.isEqual(old, updated)) {
                diff[key] = updated.filter(i => old.indexOf(i) === -1);
              }
              break;
            case this.isObject(obj1) && this.isObject(obj2):
              if (JSON.stringify(old) !== JSON.stringify(updated)) {
                diff[key] = this.getObjectDifferences(old, updated);
              }
              break;
            default:
            }
          });
          return diff;
        },
        isEqual: function(arr1, arr2) {
          if(arr1.length !== arr2.length) return false;
          for(var i = arr1.length; i--;) {
            if(arr1[i] !== arr2[i])
              return false;
          }
          return true;
        },
        isArray: function(obj) {
          return obj instanceof Array;
        },
        isObject: function(obj) {
          return !this.isArray(obj) && typeof obj === "object";
        },
        isValue: function(obj) {
          return !this.isArray(obj) && !this.isObject(obj);
        }
      };
    }(),
  };
};
