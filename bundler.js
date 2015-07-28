var path = require('path');
var fs = require('fs');
var rollup = require('rollup').rollup;

module.exports = function (options) {
  rollup({
    entry: options.entry,
    external: ['leaflet'],
    resolveExternal: function (id) {
      var root = process.cwd();
      var pkg = fs.readFileSync(path.join(root, 'node_modules', id, 'package.json'));

      if (!pkg) {
        throw new Error('Package ' + id + ' is not installed. Try `npm install ' + id + ' --save`.');
      }

      var main = JSON.parse(pkg)['jsnext:main'];

      if (!main) {
        throw new Error('package ' + id + ' is not compatable with Esri Leaflet Bundler.');
      }

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

    var code = transpiled.code;
    var map = transpiled.map;

    // throw an error if we try to use external sourcemaps piping to stdout
    if (!options.output && options.sourcemap !== 'inline') {
      throw new Error('must use inline sourcemap with piping to stdout');
    }

    // add/generate the sourcemap
    if (options.sourcemap === 'inline') {
      code = code + '\n' + map.toUrl();
    } else if (options.sourcemap) {
      code + '\n//# sourceMappingURL=' + path.resolve(options.sourcemap);
      fs.writeFileSync(path.resolve(options.sourcemap), transpiled.map);
    }

    // generate the code
    if (options.output) {
      fs.writeFileSync(path.resolve(options.output), code);
    } else {
      process.stdout.write(code);
    }
  }).catch(function (error) {
    console.log(error);
  });
};
