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
  '0-49': srdCategoryTableDef,
  '50-69': lovecraftCategoryTableDef,
  '70-84': 'monsters://pokemon'
};

function createMonsterTable(probable) {
  return probable.createTableFromDef(legendariumTableDef);
}

module.exports = createMonsterTable;
