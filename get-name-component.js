var createPathLoader = require('./path-loader');
var callNextTick = require('call-next-tick');
var async = require('async');
var materials = require('materials');
var monsters = require('monsters');
var fs = require('fs');

var corporaRoot = 'node_modules/corpora/data/';

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
        var filePath = corporaRoot + pathArray[0] + '/' + pathArray[1] + '.json';
        fs.readFile(filePath, {encoding: 'utf8'}, passFileAsJSON);

        function passFileAsJSON(error, data) {
          debugger;
          if (error) {
            done(error);
          }
          else {
            var json = JSON.parse(data);
            var targetArray = json[pathArray[2]];
            done(null, targetArray);
          }
        }
      }
    },
    'monsters': function loadMonsterArray(path, done) {
      var pathArray = path.split('/');
      var segment;
      var lastMonsterObject = monsters;

      for (var i = 0; i < pathArray.length; ++i) {
        segment = pathArray[i];
        lastMonsterObject = lastMonsterObject[segment];
        if (Array.isArray(lastMonsterObject)) {
          break;
        }
      }
      callNextTick(done, null, lastMonsterObject);
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
