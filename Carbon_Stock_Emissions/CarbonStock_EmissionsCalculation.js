// This GEE script contains calculations applying a biomass datasets utilized within the S-CAP project to estimate carbon stock and emissions
// Script by Christine Evans 
// Date 06/25/25

// Using GEDI as the example as its freely available for download from GEE
// original layers sourced from: https://developers.google.com/earth-engine/datasets/catalog/LARSE_GEDI_GEDI04_B_002

var l4b = ee.Image('LARSE/GEDI/GEDI04_B_002').select('MU');
Map.addLayer(l4b, {min: 10, max: 250, palette: '440154,414387,2a788e,23a884,7ad151,fde725'},'Mean Biomass');

// National scale roi sourced fromThe United States Office of the Geographer provides the Large Scale International Boundary (LSIB) dataset (ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"))
// Define ROI & filter with name of country of interest
var roi = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017").filter(ee.Filter.inList('country_na', ['Vietnam'])); 
var outline4 = ee.Image().byte().paint({featureCollection:roi,width:2});
Map.addLayer(outline4, {palette: ['black']},'AOI', true);

// Center console to match ROI
Map.centerObject(roi, 8);

// Average to get Total Carbon Emissions for the region's forest cover
var MiningGEDI_AGB = ee.Number(l4b.reduceRegion({reducer: ee.Reducer.mean(),geometry: roi, maxPixels: 1e9}).get('MU'));
print(MiningGEDI_AGB, 'GEDI - mining expansion AGB');

var gediAGB_tot = ee.Number(l4b.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({reducer: ee.Reducer.sum(), geometry: roi, maxPixels: 23182240}).get('MU'));
print(gediAGB_tot, 'total tons of AGB - GEDI');

var gediCO2_tot = gediAGB_tot.multiply(0.48).multiply(44).divide(12);
print(gediCO2_tot, 'total tons of CO2 -GEDI');

var MiningGEDI_CO2 = MiningGEDI_AGB.multiply(0.48).multiply(44).divide(12);
print(MiningGEDI_CO2, 'GEDI - mining expansion CO2');
