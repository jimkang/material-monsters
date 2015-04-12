var exportMethods = require('export-methods');
var defaultProbable = require('probable');
var materials = require('materials');
var monsters = require('monsters');
var createMaterialCategoryTable = require('./create-material-category-table');
var createMonsterCategoryTable = require('./create-monster-category-table');
var titleCase = require('titlecase');

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

  var materialCategoryTable = createMaterialCategoryTable(probable);
  var monsterCategoryTable = createMonsterCategoryTable(probable);

  function nameMonster() {
    var namePackage = {};

    var materialCategory = materialCategoryTable.roll();
    namePackage.material = probable.pickFromArray(materials[materialCategory]);

    var monsterCategory = monsterCategoryTable.roll();
    namePackage.monster = probable.pickFromArray(monsters[monsterCategory]);

    namePackage.name = titleCase(
      namePackage.material + ' ' + namePackage.monster
    );
    return namePackage;
  }

  return exportMethods(nameMonster);

}

module.exports = createMonsterNamer;
