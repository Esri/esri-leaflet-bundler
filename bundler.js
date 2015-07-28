var path = require('path');
var fs = require('fs');
var rollup = require('rollup').rollup;

module.exports = function (options) {
  rollup({
    entry: options.entry,
    external: ['leaflet'],
    resolveExternal: function (id) {
      var root = process.cwd();
      var pkg = path.join(root, 'node_modules', id, 'package.json');
      var main = JSON.parse(fs.readFileSync(pkg))['jsnext:main'];
      return path.join(root, 'node_modules', id, main);
    }
  }).then(function (bundle) {
    var transpiled = bundle.generate({
      format: options.format || 'umd',
      sourceMap: options.sourcemap,
      moduleName: 'L.esri',
      globals: {
        'esri-leaflet': 'L.esri'
      }
    });

    if (!options.output && options.sourcemap && options.sourcemap !== 'inline') {
      console.log('no sourcemap no output');
      throw new Error('must use inline sourcemap with piping to stdout');
    }

    if (!options.output && options.sourcemap === 'inline') {
      console.log('w/ sourcemap to stdout');
      process.stdout.write(transpiled.code + '\n' + transpiled.map.toUrl());
      return;
    }

    if (!options.output && !options.sourcemap) {
      console.log('no sourcemap to stdout');
      process.stdout.write(transpiled.code);
      return;
    }

    if (options.output && options.sourcemap === 'inline') {
      console.log('inline sourcemap to file');
      fs.writeFileSync(path.resolve(options.output), transpiled.code + '\n' + transpiled.map.toUrl());
      return;
    }

    if (options.output && options.sourcemap) {
      console.log('external sourcemap to file');
      fs.writeFileSync(path.resolve(options.output), transpiled.code + '\n//# sourceMappingURL=' + path.resolve(options.sourcemap));
      fs.writeFileSync(path.resolve(options.sourcemap), transpiled.map);
      return;
    }

    if (options.output) {
      console.log('no sourcemap to file');
      fs.writeFileSync(path.resolve(options.output), transpiled.code);
      return;
    }
  }).catch(function (error) {
    console.log(error);
  });
};
