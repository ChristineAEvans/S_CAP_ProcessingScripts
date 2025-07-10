/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var SERVIR_WA = ee.FeatureCollection("projects/ee-christineaevans/assets/CompleteWestAfricaPhase2");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// Extract GFW data SERVIR West Africa
// author: Christine Evans, SERVIR Science Coordination Office (cae004@uah.edu)
// last modified: 31 October 2023

// Set the map & ROI
// var roi = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017").filter(ee.Filter.inList('country_na', ['Ghana']));
// var roi = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017").filter(ee.Filter.inList('country_na', ['Burkina Faso']));
// var roi = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017").filter(ee.Filter.inList('country_na', ['Mali']));
// var roi = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017").filter(ee.Filter.inList('country_na', ['Niger']));
// var roi = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017").filter(ee.Filter.inList('country_na', ['Nigeria']));
// var roi = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017").filter(ee.Filter.inList('country_na', ['Senegal']));
var roi = SERVIR_WA;
var outlineROI = ee.Image().byte().paint({featureCollection:roi,width:2});
Map.setOptions('satellite');
Map.centerObject(roi, 10);
Map.addLayer(outlineROI,{palette: "black"},'ROI', true);

var base2000 = ee.Image('UMD/hansen/global_forest_change_2024_v1_12').select('treecover2000').clip(roi);
var canopy_perc = 15; // According to Ghana's FREL
var forest_def = base2000.gt(canopy_perc).updateMask(base2000.select("treecover2000").gt(canopy_perc)).clip(roi);
Map.addLayer(forest_def, {palette:['green']}, 'tree cover 2000');

var Change = ee.Image('UMD/hansen/global_forest_change_2024_v1_12').select('lossyear').clip(roi);
var treeLossVisParam = {bands: ['lossyear'],min: 0, max: 22,  palette: ['yellow', 'red']};
Map.addLayer(Change, {min: 0, max: 22,  palette: ['yellow', 'red']}, 'tree loss year');

var Lossdataset2010 = Change.select('lossyear').eq(10).clip(roi);
var Loss2010 = Change.updateMask(Lossdataset2010);
Map.addLayer(Loss2010, {palette: "red"},'Loss 2010', true);

var ForestLoss= ui.Chart.image.histogram({image: Lossdataset2010.clip(roi),
                                          region: roi,
                                          scale: 100,
                                          // maxBuckets: 100,
                                          // minBucketWidth: 50,
                                          // maxRaw: 500,
                                          maxPixels: 1e13})
                                          .setSeriesNames(['Area (ha.)'])
                                          .setOptions({title: 'GFW Forest Coverage, 2010', 
                                          hAxis: {title: 'Binary Classification'}, 
                                          vAxis: {title: 'Area (hectares)'}}); 
print(ForestLoss);

var SpawnBiomass = ee.ImageCollection("NASA/ORNL/biomass_carbon_density/v1").select('agb').mean().clip(roi);
Map.addLayer(SpawnBiomass,{min: -50, max: 80, palette: ['d9f0a3', 'addd8e', '78c679', '41ab5d', '238443', '005a32']},'Above Ground Biomass');

var AGB_mask = SpawnBiomass.mask(Lossdataset2010);
var AGB_masked = SpawnBiomass.updateMask(AGB_mask);

var visualization = {min: -50, max: 80, palette: ['d9f0a3', 'addd8e', '78c679', '41ab5d', '238443', '005a32']};
// Clip to extent of change 
Map.addLayer(AGB_masked, visualization, "AGB", false);

// Average to get Total Carbon Emissions for the regions
var Activity_AGB = AGB_masked.reduceRegion({reducer: ee.Reducer.mean(), scale: 100, geometry: roi,maxPixels: 1e9});
print(Activity_AGB);



