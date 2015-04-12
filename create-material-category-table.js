var materials = require('materials');

var materialCategoryProbabilities = {};

var categories = Object.keys(materials);

categories.forEach(addDefaultProbability);

function addDefaultProbability(category) {
  var weight = 2;
  if (category.indexOf('_corpora_') === 0) {
    // The corpora lists are materials but are things like food rather than 
    // "classic" materials.
    weight = 1;
  }
  materialCategoryProbabilities[category] = weight;
}

materialCategoryProbabilities['natural materials'] = 3;
materialCategoryProbabilities['fabrics'] = 4;
materialCategoryProbabilities['fibers'] = 5;

function createMaterialCategoryTable(probable) {
  return probable.createRangeTableFromDict(materialCategoryProbabilities);
}

module.exports = createMaterialCategoryTable;
