var materialTableDef = {
  '0-15': 'materials/building materials',
  '16-29': 'materials/natural materials',
  '21-25': 'materials/technical fabrics',
  '26-35': 'materials/metals',
  '36-40': 'materials/layperson metals',
  '41-42': 'materials/plastic brands',
  '43-47': 'materials/packaging',
  '48-55': 'materials/sculpture materials',
  '56-65': 'materials/decorative stones',
  '66-80': 'materials/fabrics',
  '81-90': 'materials/fibers',
  '91-91': 'materials/carbon allotropes',
  '92-95': 'materials/abridged body fluids'
};

var foodTableDef = {
  '0-9': 'corpora/foods/breads_and_pastries/breads',
  '10-14': 'corpora/foods/breads_and_pastries/pastries',
  '15-17': 'corpora/foods/herbs_n_spices/herbs',
  '18-21': 'corpora/foods/herbs_n_spices/spices',
  '22-34': 'corpora/foods/vegetables/vegetables',
  '35-44': 'corpora/foods/fruits/fruits'
};

var geographyTableDef = {
  '0-1': 'corpora/geography/english_towns_cities/towns',
  '2-5': 'corpora/geography/oceans/oceans',
  '6-14': 'corpora/geography/oceans/seas',
  '15-17': 'corpora/geography/rivers/rivers'
};

var humansTableDef = {
  '0-0': 'corpora/humans/authors/authors',
  '1-5': 'corpora/humans/firstNames/firstNames',
  '6-24': 'corpora/humans/occupations/occupations',
  '25-26': 'corpora/humans/prefixes/prefixes',
  '26-26': 'corpora/humans/spanishFirstNames/firstNames'
};

var outerTableDef = {
  '0-19': materialTableDef,
  '20-24': foodTableDef,
  '25-26': 'corpora/archetypes/setting/settings',
  '27-28': 'corpora/archetypes/character/characters',
  '29-32': 'corpora/colors/crayola/colors',
  '33-42': geographyTableDef,
  '43-46': humansTableDef,
  '47-48': 'corpora/plants/flowers/flowers',
  '49-52': 'corpora/technology/computer_sciences/computer_sciences'
};

function createMaterialCategoryTable(probable) {
  return probable.createTableFromDef(outerTableDef);
}

module.exports = createMaterialCategoryTable;
