var path = require('path');
var fs = require('fs');
var rollup = require('rollup').rollup;
var arrayify = require('arrayify');
var nodeResolve = require('rollup-plugin-node-resolve');
var json = require('rollup-plugin-json');
var uglify = require('rollup-plugin-uglify');

// var copyright = '/* ' + pkg.name + ' - v' + pkg.version + ' - ' + new Date().toString() + '\n' +
//                 ' * Copyright (c) ' + new Date().getFullYear() + ' Environmental Systems Research Institute, Inc.\n' +
//                 ' * ' + pkg.license + ' */';

module.exports = function (options) {
  var external = arrayify(options.external).push('leaflet');
  var plugins = [
    nodeResolve({
      jsnext: true
    }),
    json()
  ];

  if(options.minify) {
    plugins.push(uglify())
  }

  rollup({
    entry: path.resolve(process.cwd(), options.entry),
    external: ['leaflet'],
    plugins: plugins
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
