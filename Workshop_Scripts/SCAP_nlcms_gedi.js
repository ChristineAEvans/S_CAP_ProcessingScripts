// Estimate Carbon Emissions using NLCMS and GEDI for Nepal 
// author: Christine Evans, SERVIR Science Coordination Office (cae004@uah.edu)
// last modified: April 8, 2024

// Set the map & ROI
// var roi = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017").filter(ee.Filter.inList('country_na', ['Belize']));
// var roi = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017").filter(ee.Filter.inList('country_na', ['Guatemala']));
// var roi = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017").filter(ee.Filter.inList('country_na', ['El Salvador']));
// var roi = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017").filter(ee.Filter.inList('country_na', ['Costa Rica']));
// var roi = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017").filter(ee.Filter.inList('country_na', ['Panama']));
// var roi = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017").filter(ee.Filter.inList('country_na', ['Honduras']));
var roi = ee.FeatureCollection("projects/servir-sco-assets/assets/SCO_CA/BZ_MRV/aoi_BZ/CentralAmerica");
var bz_bmp_mpr = /* color: #ff1806 */ee.Geometry.Polygon(
        [[[-89.05862015218591, 17.278416007090847],
          [-89.05862015218591, 16.845176431155156],
          [-88.73109024495935, 16.845176431155156],
          [-88.73109024495935, 17.278416007090847]]], null, false);
var outlineROI = ee.Image().byte().paint({featureCollection:roi,width:2});
var outlinePineRidge = ee.Image().byte().paint({featureCollection:bz_bmp_mpr,width:3});
Map.setOptions('satellite');
Map.centerObject(bz_bmp_mpr, 10);
Map.addLayer(outlineROI,{palette: "black"},'Belize', true);

// Determine land cover 2020
var dataset2020 = ee.ImageCollection('ESA/WorldCover/v100').first();
var visualization = { bands: ['Map'],};
Map.addLayer(dataset2020.clip(roi), visualization, 'LULC 2020');

// Determine land cover 2021
var dataset2021 = ee.ImageCollection('ESA/WorldCover/v200').first();
var visualization = {bands: ['Map'],};
Map.addLayer(dataset2021.clip(roi), visualization, 'LULC 2021');

// Determine forest cover 2020
// 10. Tree Cover 20. Shrubland 30. Grassland 40. Cropland 50. Built-up 
// 60. Bare/sparse vegetation 70. Snow and ice 80. Permanent water bodies 
// 90. Herbaceous wetland 95. Mangroves 100. Moss and lichen
var forestdataset2020 = dataset2020.eq(10).clip(roi);
var forest20 = forestdataset2020.updateMask(dataset2020);
Map.addLayer(forest20, {}, 'Forest 2020');

var forestdataset2021 = dataset2021.eq(10).clip(roi);
var forest21 = forestdataset2021.updateMask(dataset2021);
Map.addLayer(forest21, {}, 'Forest 2021');

var ForestCover2020= ui.Chart.image.histogram({image: forestdataset2020.clip(roi),
                                          region: roi,
                                          scale: 100,
                                          // maxBuckets: 100,
                                          // minBucketWidth: 50,
                                          // maxRaw: 500,
                                          maxPixels: 1e13})
                                          .setSeriesNames(['Area (ha.)'])
                                          .setOptions({title: 'WorldCover Forest Coverage, 2020', 
                                          hAxis: {title: 'Binary Classification'}, 
                                          vAxis: {title: 'Area (hectares)'}}); 
print(ForestCover2020);
var ForestCover2021= ui.Chart.image.histogram({image: forestdataset2021.clip(roi),
                                          region: roi,
                                          scale: 100,
                                          // maxBuckets: 100,
                                          // minBucketWidth: 50,
                                          // maxRaw: 500,
                                          maxPixels: 1e13})
                                          .setSeriesNames(['Area (ha.)'])
                                          .setOptions({title: 'WorldCover Forest Coverage, 2021', 
                                          hAxis: {title: 'Binary Classification'}, 
                                          vAxis: {title: 'Area (hectares)'}}); 
print(ForestCover2021);

// Calculate change in forest area between 2020 & 2021
var ForestSubtraction = forest20.subtract(forest21);
Map.addLayer(ForestSubtraction, {min: -1, max: 1, palette: ['065143', 'AEC3B0', 'FE4A49']}, 'WorldCover Forest Activity', true);
// Seperate Growth, Stable, and Loss 
var Loss = ForestSubtraction.eq(1); 
var Stable = ForestSubtraction.eq(0);
var Growth = ForestSubtraction.eq(-1);
// var ForestCoverloss= ui.Chart.image.histogram({image: Loss.clip(roi),
//                                           region: roi,
//                                           scale: 100,
//                                           // maxBuckets: 100,
//                                           // minBucketWidth: 50,
//                                           // maxRaw: 500,
//                                           maxPixels: 1e13})
//                                           .setSeriesNames(['Area (ha.)'])
//                                           .setOptions({title: 'WorldCover Forest Loss', 
//                                           hAxis: {title: 'Binary Classification'}, 
//                                           vAxis: {title: 'Area (hectares)'}}); 
// print(ForestCoverloss);
// var ForestCovergrowth= ui.Chart.image.histogram({image: Growth.clip(roi),
//                                           region: roi,
//                                           scale: 100,
//                                           // maxBuckets: 100,
//                                           // minBucketWidth: 50,
//                                           // maxRaw: 500,
//                                           maxPixels: 1e13})
//                                           .setSeriesNames(['Area (ha.)'])
//                                           .setOptions({title: 'WorldCover Forest Growth', 
//                                           hAxis: {title: 'Binary Classification'}, 
//                                           vAxis: {title: 'Area (hectares)'}}); 
// print(ForestCovergrowth);
var ActivityData = ForestSubtraction.updateMask(Loss);
Map.addLayer(ActivityData, {palette:['red']}, 'WorldCover Forestloss', true);

var GEDI = ee.Image('LARSE/GEDI/GEDI04_B_002').select('MU').clip(roi);
Map.addLayer(GEDI,{min: 10, max: 250, palette: '440154,414387,2a788e,23a884,7ad151,fde725'},'Mean Biomass');

var AGB_mask = GEDI.mask(ActivityData)
var AGB_masked = GEDI.updateMask(AGB_mask);

var visualization = {min: 10, max: 250, palette: ['d9f0a3', 'addd8e', '78c679', '41ab5d', '238443', '005a32']};
// Clip to extent of change 
Map.addLayer(AGB_masked, visualization, "AGB", false);

// Average to get Total Carbon Emissions for the regions
var Activity_AGB = AGB_masked.reduceRegion({reducer: ee.Reducer.mean(), geometry: roi,maxPixels: 1e9});
print(Activity_AGB);

// Map.addLayer(outlinePineRidge,{palette: "black"},'Pine Ridge', true);
