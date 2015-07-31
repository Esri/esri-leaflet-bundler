# Esri Leaflet Bundler

Tool for generating custom builds of Esri Leaflet and it's plugins.

## Usage

1. Install the Esri Leaflet modules you want to use with NPM and save them in your `package.json`. E.x. `npm install esri-leaflet --save`
2. Create a file that imports the modules you want and provides a default export.

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

3. Run `esri-leaflet-bundler my-custom-build.js --output esri-leaflet.js`

## Options

Option | Default | Description
--- | --- | ---
`-o` `--output` | false | Output file pipes to STDOUT by default.
`-m` `--sourcemap` | false | Output a sourcemap file or `'inline'` for an inline sourcemap.
`-f` `--format` | `'umd'` | Module format to output. Defaults to UMD.

## Things To Note

Custom modules (like the 'Geocoding' within `L.esri.Geocoding.geosearch`) will be dropped so you'll need to access the object directly (ie: from `L.esri.geosearch`)

If you reference both `L.esri.query` and `L.esri.Related.query` in your app, you'll want to remap to avoid a collision

    ```
    import {
      query as queryRelated
    } from 'esri-leaflet-related';

    export default {
      query: query,
      ...
      queryRelated: queryRelated
    };
    ```

## Compatible Plugins

* Esri Leaflet [2.0.0-beta.5](https://github.com/Esri/esri-leaflet/releases/tag/v2.0.0-beta.5) -`npm install esri-leaflet@2.0.0-beta.5`
* Esri Leaflet Geocoder [2.0.0-beta.3](https://github.com/Esri/esri-leaflet-geocoder/releases/tag/v2.0.0-beta.3) -`npm install esri-leaflet-geocoder@2.0.0-beta.3`
* Esri Leaflet GP [2.0.0-beta.1](https://github.com/jgravois/esri-leaflet-gp/releases/tag/v2.0.0-beta.1) -`npm install esri-leaflet-gp@2.0.0-beta.1`
* Esri Leaflet Related [2.0.0-beta.1](https://github.com/jgravois/esri-leaflet-related/releases/tag/v2.0.0-beta.1) -`npm install esri-leaflet-related@2.0.0-beta.1`
