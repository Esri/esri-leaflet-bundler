# Esri Leaflet Bundler

Tool for generating custom builds of Esri Leaflet and it's plugins.

## Usage

1. Install the Esri Leaflet modules you want to use with NPM and save them in your `package.json`. E.x. `npm install esri-leaflet --save`
2. Create a file that imports the modules you want and provides a default export.

    ```js
    // my-custom-build.js
    import { basemapLayer } from './node_modules/esri-leaflet/src/Layers/BasemapLayer.js';
    import { featureLayer } from './node_modules/esri-leaflet/src/Layers/FeatureLayer/FeatureLayer.js';
    
    import { geosearch } from './node_modules/esri-leaflet-geocoder/src/Controls/Geosearch.js';
    import { arcgisOnlineProvider } from './node_modules/esri-leaflet-geocoder/src/Providers/ArcgisOnlineGeocoder.js';
    import { featureLayerlineProvider } from './node_modules/esri-leaflet-geocoder/src/Providers/FeatureLayer.js';
    
    export default {
      basemapLayer: basemapLayer,
      featureLayer: featureLayer,
      geosearch: geosearch,
      arcgisOnlineProvider: arcgisOnlineProvider,
      featureLayerProvider: featureLayerProvider
    };
    ```

3. Run `esri-leaflet-bundler my-custom-build.js --output esri-leaflet.js`

## Options

Option | Default | Description
--- | --- | ---
`-o` `--output` | false | Output file pipes to STDOUT by default.
`-m` `--sourcemap` | false | Output a sourcemap file or `'inline'` for an inline sourcemap.
`-f` `--format` | `'umd'` | Module format to output too. Defaults to UMD.
`--minify` | `false` | Minify the output with Uglify JS.

## Sample

You can find an example project [here](./example).

## Things To Note

Custom modules (like the 'Geocoding' within `L.esri.Geocoding.geosearch`) will be dropped so you'll need to access the object directly (ie: from `L.esri.geosearch`)

If you reference both `L.esri.query` and `L.esri.Related.query` in your app, you'll want to remap to avoid a collision

```js
import { query as queryRelated } from './node_modules/esri-leaflet-related/src/EsriLeafletRelated.js';

export default {
  query: query,
  ...
  queryRelated: queryRelated
};
```

## Compatible Plugins

* Esri Leaflet [2.0.0-beta.5](https://github.com/Esri/esri-leaflet/releases/tag/v2.0.0-beta.5)+ -`npm install esri-leaflet@2.0.0-beta.5`
* Esri Leaflet Geocoder [2.0.0-beta.3](https://github.com/Esri/esri-leaflet-geocoder/releases/tag/v2.0.0-beta.3) -`npm install esri-leaflet-geocoder@2.0.0-beta.3`
* Esri Leaflet GP [2.0.0-beta.1](https://github.com/jgravois/esri-leaflet-gp/releases/tag/v2.0.0-beta.1)+ -`npm install esri-leaflet-gp@2.0.0-beta.1`
* Esri Leaflet Related [2.0.0-beta.1](https://github.com/jgravois/esri-leaflet-related/releases/tag/v2.0.0-beta.1)+ -`npm install esri-leaflet-related@2.0.0-beta.1`

## Contributing

Esri welcomes contributions from anyone and everyone. Please see our [guidelines for contributing](https://github.com/Esri/esri-leaflet-browserify-example/blob/master/CONTRIBUTING.md).

## Licensing
Copyright 2015 Esri

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [LICENSE](./LICENSE) file.

[](Esri Tags: ArcGIS Web Mapping Leaflet ES6 ES2015)
[](Esri Language: JavaScript)
