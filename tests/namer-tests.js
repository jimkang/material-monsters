var test = require('tape');
var createNamer = require('../monster-namer');
var seedrandom = require('seedrandom');

test('Generate valid names', function validNames(t) {
  var numberOfRuns = 2000;
  t.plan(numberOfRuns * 4);

  for (var i = 0; i < numberOfRuns; ++i) {
    var seed = 'seed-' + i;
    var namer = createNamer({
      random: seedrandom(seed)
    });
    var name = namer.nameMonster(checkName);

    function checkName(error, name) {
      t.ok(!error, 'Does not pass an error back.');

      t.ok(
        typeof name.material === 'string' && name.material.length > 0,
        'material is OK for seed ' + seed
      );
      t.ok(
        typeof name.monster === 'string' && name.monster.length > 0,
        'monster is OK for seed ' + seed
      );
      t.ok(
        typeof name.name === 'string' && name.name.length > 0,
        'name is OK for seed ' + seed
      );
    }
  }
});
