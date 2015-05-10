var createNamer = require('../monster-namer');
var seedrandom = require('seedrandom');

var numberOfRuns = 1;
var fixedSeed;

if (process.argv.length > 2) {
  var extraArg = process.argv[2];
  if (isNaN(+extraArg)) {
    fixedSeed = extraArg;    
  }
  else {
    numberOfRuns = extraArg;
  }
}

for (var i = 0; i < numberOfRuns; ++i) {
  var seed;
  if (fixedSeed) {
    seed = fixedSeed;
  }
  else {
    seed = (new Date()).toISOString();
  }
  // seed = '2015-04-26T00:18:31.294Z';
  console.log('seed:', seed);

  var namer = createNamer({
    random: seedrandom(seed)
  });

  namer.nameMonster(displayName);
}

function displayName(error, name) {
  if (error) {
    console.log(error);
  }
  console.log(name);
}
