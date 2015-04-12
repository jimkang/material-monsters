var createNamer = require('../monster-namer');
var seedrandom = require('seedrandom');

var seed = (new Date()).toISOString();
// seed = '2015-04-11T12:15:41.823Z';
console.log('seed:', seed);

var namer = createNamer({
  random: seedrandom(seed)
});

console.log(namer.nameMonster());
