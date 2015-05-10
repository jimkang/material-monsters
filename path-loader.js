var callNextTick = require('call-next-tick');

function createPathLoader(opts) {
  var protocolHandlers;

  if (opts) {
    // protocolHandlers should be a dictionary of functions for keys.
    // Keys shold be like like 'corpora' and functions should take a string and
    // callback that will return an array once it's done looking up the path.
    protocolHandlers = opts.protocolHandlers;
  }

  function loadFromPath(path, done) {
    var value;
    var parts = path.split('://');
    
    if (parts.length !== 2) {
      callNextTick(done, new Error('Could not understand path'));
      return;
    }
    
    var protocol = parts[0];
    var path = parts[1];

    var handler = protocolHandlers[protocol];
    if (typeof handler !== 'function') {
      callNextTick(done, new Error('Could not find handler for protocol'));
      return;
    }

    handler(path, done);
  }

  return {
    loadFromPath: loadFromPath
  };
}

module.exports = createPathLoader;
