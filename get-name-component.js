var createPathLoader = require('./path-loader');
var callNextTick = require('call-next-tick');
var async = require('async');
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

function getNameComponent(opts, done) {
  var probable;
  var path;

  if (opts) {
    probable = opts.probable;
    path = opts.path;
  }

  async.waterfall(
    [
      passBackPath,
      pathLoader.loadFromPath,
      getComponentFromArray,
    ],
    done
  );

  function passBackPath(passBack) {
    callNextTick(passBack, null, path);
  }

  function getComponentFromArray(array, done) {
    var component = probable.pickFromArray(array);
    var error;

    // Special cases.
    if (typeof component === 'object') {
      if ('name' in component) {
        component = component.name;
      }
      else if ('color' in component) {
        component = component.color;
      }
      else {
        error = new Error('Unrecognized component: ' +
          JSON.stringify(component, null, '  ')
        );
      }
    }
    callNextTick(done, error, component);
  }
}

module.exports = getNameComponent;
