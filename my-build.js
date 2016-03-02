// my-custom-build.js
import {
  featureLayer,
  basemapLayer,
  query
} from 'esri-leaflet';

import {
  geosearch,
  arcgisOnlineProvider,
  featureLayerProvider
} from 'esri-leaflet-geocoder';

import {
  service,
  task,
} from 'esri-leaflet-gp';

import {
  query as queryRelated
} from 'esri-leaflet-related';

export default {
  featureLayer,
  basemapLayer,
  query,
  geosearch,
  arcgisOnlineProvider,
  featureLayerProvider,
  service,
  task,
  queryRelated
}
