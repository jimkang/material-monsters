var createPathLoader = require('./path-loader');
var callNextTick = require('call-next-tick');
var async = require('async');
var createMaterialCategoryTable = require('./create-material-category-table');
var materials = require('materials');
var corpora = require('corpora-project');

var pathLoader = createPathLoader({
  protocolHandlers: {
    'materials': function loadMaterialArray(path, done) {
      callNextTick(done, null, materials[path]);
    },
    'corpora': function loadFromCorporaPath(path, done) {
      var pathArray = path.split('/');

      if (pathArray.length !== 3) {
        callNextTick(done, new Error('Could not understand corpora path.'));
      }
      else {
        callNextTick(
          done, null, corpora.getFile(pathArray[0], pathArray[1])[pathArray[2]]
        );
      }
    }
  }
});

function getMaterial(opts, done) {
  var probable;

  if (opts) {
    probable = opts.probable;
  }
  var materialCategoryTable = createMaterialCategoryTable(probable);
  async.waterfall(
    [
      getMaterialPath,
      pathLoader.loadFromPath,
      getMaterialFromArray,
    ],
    done
  );

  function getMaterialPath(getPathDone) {
    callNextTick(getPathDone, null, materialCategoryTable.roll());
  }

  function getMaterialFromArray(materialArray, done) {
    var material = probable.pickFromArray(materialArray);
    var error;

    if (typeof material === 'object') {
      if ('name' in material) {
        material = material.name;
      }
      else if ('color' in material) {
        material = material.color;
      }
      else {
        error = new Error('Unrecognized material: ' +
          JSON.stringify(material, null, '  ')
        );
      }
    }
    callNextTick(done, error, material);
  }
}

module.exports = getMaterial;
