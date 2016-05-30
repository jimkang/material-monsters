var monsters = require('monsters');

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
  '0-39': srdCategoryTableDef,
  '40-49': lovecraftCategoryTableDef,
  '50-59': 'monsters://pokemon',
  '60-79': 'monsters://animals/wikipedia',
  '80-89': 'monsters://zelda/enemies'
};

function createMonsterTable(probable) {
  return probable.createTableFromDef(legendariumTableDef);
}

module.exports = createMonsterTable;
