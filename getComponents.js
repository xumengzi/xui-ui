const fs = require('fs');

const getAll = function(path){
  var obj = {};
  let dirs = fs.readdirSync(path);
  dirs.forEach(item=>{
    obj[item] = path + '/' + item + '/' + item;
  });
  return obj;
};

module.exports = getAll;