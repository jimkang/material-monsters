material-monsters
==================

This module generates monster names, combining traditional monsters with materials of all sorts.

Installation
------------

    npm install material-monsters

Usage
-----

    var createMonsterFactory = require('material-monsters');
    var monsterFactory = createMonsterFactory();
    console.log(monsterFactory.nameMonster());

Output:

    {
      material: 'ytterbium',
      monster: 'Ooze',
      name: 'Ytterbium Ooze'
    }

If you want to create a factory that uses a random function that creates reproducible outcomes, you can use something like [seedrandom](https://www.npmjs.com/package/seedrandom) and pass it to `create`:

    var seedrandom = require('seedrandom');
    var seed = (new Date()).toISOString();
    var monsterFactory = createMonsterFactory({
      random: seedrandom(seed)
    });

To try it from the command line rather than as part of a program:

    node node_modules/material-monsters/name-monster.js

License
-------

The MIT License (MIT)

Copyright (c) 2015 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
