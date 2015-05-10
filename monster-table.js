var monsters = require('monsters');
var exportMethods = require('export-methods');

var legendariumTableDef = {
  srd: 2,
  lovecraft: 1,
  pokemon: 1
};

var srdCategoryTableDef = {
  monsters: 10,
  animals: 2,
  vermin: 1  
};

var lovecraftCategoryTableDef = {
  deities: 2,
  species: 1
};


function createMonsterTable(probable) {
  // return probable.createTableFromDef(legendariumTableDef);

  var legendariumTable = probable.createRangeTableFromDict(legendariumTableDef);

  var srdCategoryTable = probable.createRangeTableFromDict(srdCategoryTableDef);
  var lovecraftCategoryTable = probable.createRangeTableFromDict(
    lovecraftCategoryTableDef
  );

  function roll() {
    // TODO: probable should handle cascading tables.
    var legendarium = legendariumTable.roll();
    var category;
    var monsterList;

    if (legendarium === 'pokemon') {
      monsterList = monsters.pokemon;
    }
    else {
      if (legendarium === 'srd') {
        category = srdCategoryTable.roll();
      }
      else if (legendarium === 'lovecraft') {
        category = lovecraftCategoryTable.roll();
      }
      monsterList = monsters[legendarium][category];
    }

    return probable.pickFromArray(monsterList);
  }

  return exportMethods(roll);
}

module.exports = createMonsterTable;
