var materials = require('materials');

var materialCategoryProbabilities = {};

var categories = Object.keys(materials);

categories.forEach(addDefaultProbability);

function addDefaultProbability(category) {
  var weight = 4;
  if (category === 'plastic brands') {
    weight === 1;
  }
  else if (category.indexOf('_corpora_') === 0) {
    // The corpora lists are materials but are things like food rather than 
    // "classic" materials.
    weight = 1;
  }
  materialCategoryProbabilities[category] = weight;
}

materialCategoryProbabilities['building materials'] = 5;
materialCategoryProbabilities['natural materials'] = 5;
materialCategoryProbabilities['fabrics'] = 7;
materialCategoryProbabilities['fibers'] = 7;

function createMaterialCategoryTable(probable) {
  return probable.createRangeTableFromDict(materialCategoryProbabilities);
}

module.exports = createMaterialCategoryTable;
