## Steps

1. run `npm install` in this folder.
2. in the root of this repository run 

```bash
esri-leaflet-bundler example/basemap-build.js --output example/esri-leaflet-shaken.js --minify
```
this will generate a 14.4KB (5KB gzipped) version of esri leaflet that includes only `L.esri.basemapLayer`

## how does it work?

Running `npm install` looks at the package.json inside the example folder and uses the information to fetch esri leaflet.

Running the second command asks the esri leaflet bundler to export only the modules that are included in `basemap-build.js` in a new file in the same folder.  this custom build can be referenced from applications (instead of loading the entirety of esri-leaflet via CDN).  