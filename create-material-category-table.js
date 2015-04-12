var materials = require('materials');

var materialCategoryProbabilities = {};

var categories = Object.keys(materials);

categories.forEach(addDefaultProbability);

function addDefaultProbability(category) {
  materialCategoryProbabilities[category] = 1;
}

materialCategoryProbabilities['natural materials'] = 3;
materialCategoryProbabilities['technical fabrics'] = 2;
materialCategoryProbabilities['layperson metals'] = 3;
materialCategoryProbabilities['plastic brands'] = 2;
materialCategoryProbabilities['fabrics'] = 2;
materialCategoryProbabilities['fibers'] = 2;

function createMaterialCategoryTable(probable) {
  return probable.createRangeTableFromDict(materialCategoryProbabilities);
}

module.exports = createMaterialCategoryTable;
