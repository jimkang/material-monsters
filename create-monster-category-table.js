var monsters = require('monsters');

var monsterCategoryProbabilities = {};

var categories = Object.keys(monsters);

categories.forEach(addDefaultProbability);

function addDefaultProbability(category) {
  monsterCategoryProbabilities[category] = 1;
}

monsterCategoryProbabilities['monsters'] = 3;

function createMonsterCategoryTable(probable) {
  return probable.createRangeTableFromDict(monsterCategoryProbabilities);
}

module.exports = createMonsterCategoryTable;
