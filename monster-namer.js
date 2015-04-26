var exportMethods = require('export-methods');
var defaultProbable = require('probable');
var materials = require('materials');
var monsters = require('monsters');
var createMaterialCategoryTable = require('./create-material-category-table');
var createMonsterTable = require('./monster-table');
var titleCase = require('titlecase');
var corpora = require('corpora-project');

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
  var monsterTable = createMonsterTable(probable);

  function nameMonster() {
    var namePackage = {};

    debugger;
    var materialArray = materialCategoryTable.roll();
    if (typeof materialArray === 'string' &&
      materialArray.indexOf('corpora/') === 0) {

      materialArray = getArrayFromCorpora(materialArray);
    }
    else if (typeof materialArray === 'string' &&
      materialArray.indexOf('materials/') === 0) {

      var materialPathArray = materialArray.split('/');
      if (materialPathArray.length < 1) {
        throw new Error('Unrecognized material path: ' + materialArray);
      }
      materialArray = materials[materialPathArray[1]];
    }

    namePackage.material = probable.pickFromArray(materialArray);
    if (typeof namePackage.material === 'object') {
      if ('name' in namePackage.material) {
        namePackage.material = namePackage.material.name;
      }
      else if ('color' in namePackage.material) {
        namePackage.material = namePackage.material.color;
      }
      else {
        throw new Error('Unrecognized material: ' +
          JSON.stringify(namePackage.material, null, '  ')
        );
      }
    }

    namePackage.monster = monsterTable.roll();

    namePackage.name = titleCase(
      namePackage.material + ' ' + namePackage.monster
    );
    return namePackage;
  }

  return exportMethods(nameMonster);

}

function getArrayFromCorpora(corporaPath) {
  var pathArray = corporaPath.split('/');
  if (pathArray.length > 3) {
    return corpora.getFile(pathArray[1], pathArray[2])[pathArray[3]];
  }
}

module.exports = createMonsterNamer;
