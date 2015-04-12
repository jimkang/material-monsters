var monsters = require('monsters');

var monsterCategoryProbabilities = {};

var categories = Object.keys(monsters);

categories.forEach(addDefaultProbability);

function addDefaultProbability(category) {
  monsterCategoryProbabilities[category] = 1;
}

monsterCategoryProbabilities['monsters'] = 5;

function createMonsterCategoryTable(probable) {
  return probable.createRangeTableFromDict(monsterCategoryProbabilities);
}

module.exports = createMonsterCategoryTable;
