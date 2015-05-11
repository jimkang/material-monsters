var monsters = require('monsters');
var exportMethods = require('export-methods');

var srdCategoryTableDef = {
  '0-80': 'monsters://srd/monsters',
  '81-90': 'monsters://srd/animals',
  '91-99': 'monsters://srd/vermin'
};

var lovecraftCategoryTableDef = {
  '0-39': 'monsters://lovecraft/deities',
  '40-99': 'monsters://lovecraft/species'
};

var legendariumTableDef = {
  '0-29': srdCategoryTableDef,
  '30-39': lovecraftCategoryTableDef,
  '40-49': 'monsters://pokemon',
  '50-69': 'monsters://animals/wikipedia',
  '70-79': 'monsters://starWars/species',
  '80-89': 'monsters://zelda/enemies'
};

function createMonsterTable(probable) {
  return probable.createTableFromDef(legendariumTableDef);
}

module.exports = createMonsterTable;
