var exportMethods = require('export-methods');
var defaultProbable = require('probable');
var monsters = require('monsters');
var createMonsterTable = require('./monster-table');
var titleCase = require('titlecase');
var callNextTick = require('call-next-tick');
var getNameComponent = require('./get-name-component');
var queue = require('queue-async');
var createMaterialCategoryTable = require('./create-material-category-table');

function createMonsterNamer(opts) {
  var probable;
  var random;

  if (opts) {
    probable = opts.probable;
    random = opts.random;
  }

  if (!probable) {
    if (random) {
      probable = defaultProbable.createProbable({
        random: random
      });
    }
    else {
      probable = defaultProbable;
    }
  }

  var materialTable = createMaterialCategoryTable(probable);
  var monsterTable = createMonsterTable(probable);

  function nameMonster(done) {
    var q = queue(2);
    q.defer(getNameComponent, {
      probable: probable,
      path: materialTable.roll()
    });
    q.defer(getNameComponent, {
      probable: probable,
      path: monsterTable.roll()
    });
    q.await(assemblePackage);

    function assemblePackage(error, material, monster) {
      if (error) {
        done(error);
      }
      else {
        var namePackage = {
          material: material,
          monster: monster
        };

        namePackage.name = titleCase(
          namePackage.material + ' ' + namePackage.monster
        );
        done(error, namePackage);
      }
    }
  }

  return exportMethods(nameMonster);
}

module.exports = createMonsterNamer;
