# Esri Leaflet Bundler

Tool for generating custom builds of Esri Leaflet and it's plugins.

## Usage

* Install the Esri Leaflet modules you want to use with NPM and save them in your `package.json`. E.x. `npm install esri-leaflet --save`
* Create a file that imports the modules you want and provides a default export.

```js
// my-custom-build.js
import {
  featureLayer,
  basemapLayer
} from 'esri-leaflet';

import {
  geosearch,
  arcgisOnlineProvider,
  featureLayerProvider
} from 'esri-leaflet-geocoder';

export default {
  featureLayer: featureLayer,
  basemapLayer: basemapLayer,
  geosearch: geosearch,
  arcgisOnlineProvider: arcgisOnlineProvider,
  featureLayerProvider: featureLayerProvider
};
```

* Run `esri-leaflet-bundler my-custom-build.js --output esri-leaflet.js`

## Options

Option | Default | Description
--- | --- | ---
`-o` `--output` | false | Output file pipes to STDOUT by default.
`-m` `--sourcemap` | false | Output a sourcemap file or `'inline'` for an inline sourcemap.
`-f` `--format` | `'umd'` | Module format to output too. Defaults to UMD.

## Compatible Plugins

* Esri Leaflet 2.0.0-beta.5 -`npm install esri-leaflet@2.0.0-beta.5`
* Esri Leaflet Geocoder 2.0.0-beta.3 -`npm install esri-leaflet-geocoder@2.0.0-beta.3`
