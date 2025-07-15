/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var footprints = ee.FeatureCollection("projects/ee-cersgisrsteams/assets/MINING_FOOTPRINT/Footprint_Collection"),
    ROI = ee.FeatureCollection("projects/servir-sco-assets/assets/SCO_WA/roi_ghana"),
    GFW14 = ee.Image("projects/servir-sco-assets/assets/SCO_WA/Galamsey/Forest2014_WA"),
    GFW15 = ee.Image("projects/servir-sco-assets/assets/SCO_WA/Galamsey/Forest2015_WA"),
    GFW16 = ee.Image("projects/servir-sco-assets/assets/SCO_WA/Galamsey/Forest2016_WA"),
    GFW17 = ee.Image("projects/servir-sco-assets/assets/SCO_WA/Galamsey/Forest2017_WA"),
    GFW18 = ee.Image("projects/servir-sco-assets/assets/SCO_WA/Galamsey/Forest2018_WA"),
    GFW19 = ee.Image("projects/servir-sco-assets/assets/SCO_WA/Galamsey/Forest2019_WA"),
    GFW20 = ee.Image("projects/servir-sco-assets/assets/SCO_WA/Galamsey/Forest2020_WA"),
    GFW21 = ee.Image("projects/servir-sco-assets/assets/SCO_WA/Galamsey/Forest2021_WA"),
    GFW22 = ee.Image("projects/servir-sco-assets/assets/SCO_WA/Galamsey/Forest2022_WA"),
    GFW23 = ee.Image("projects/servir-sco-assets/assets/SCO_WA/Galamsey/Forest2023_WA");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// Determine Forest Coverage [throughout entire Southwest Ghana ROI: 'projects/servir-sco-assets/assets/SCO_WA/roi_ghana'] using GFW estimated forest extents generated and exported using the following 
// script: https://code.earthengine.google.com/?scriptPath=users%2FMCD12Q1_landcover%2FCarbonSlider%3A0x_Hansen_ForestMask_generater_WA
// tree canopy coverage was adjusted to 15% to match the country defined definition of forest in the national FRL: https://redd.unfccc.int/submissions.html?country=gha
var coverage_chart = ui.Chart.image.histogram({image: GFW14.unmask().clip(ROI),
                                          region: ROI,
                                          scale: 100,
                                          // maxBuckets: 100,
                                          // minBucketWidth: 50,
                                          // maxRaw: 500,
                                          maxPixels: 3000000000})
                                          .setSeriesNames(['Area (ha.)'])
                                          .setOptions({title: 'nonforest (0) v. forest cover (1)', 
                                          hAxis: {title: 'Binary Classification'}, 
                                          vAxis: {title: 'Area (hectares)'}}); 

print(coverage_chart);
// pull in annual forest coverage for years of interest and crop to desired aoi
var forestCoverageA = GFW14
var forestCoverageB = GFW15
var forestpal = {"opacity":1,"bands":["treecover2000"],"min":0,"max":1,"palette":["FFFFFF","078b12"]};
Map.addLayer(forestCoverageA, forestpal, 'Year A');
Map.addLayer(forestCoverageB, forestpal, 'Year B');
// Determine annual Forest Change Characterics of all causes by subtracting the two years of interest. 
// "-1": forest loss, "0": No Change ... if subtracting prior year from "current" year
var LCCoverageChange = forestCoverageB.subtract(forestCoverageA);
var changePal = {"opacity":1,"bands":["treecover2000"],"min":-1,"max":1,"palette":["ff0808","078b12","09e2ce"]};
Map.addLayer(LCCoverageChange, changePal, 'Change Characteristics', true);
// quantify changes within desired aoi (ROI) -- this is all change from forest, not just mining
// 100x100 meters = 1 ha.
var change_chart = ui.Chart.image.histogram({image: LCCoverageChange.unmask().clip(ROI),
                                          region: ROI,
                                          scale: 100,
                                          // maxBuckets: 100,
                                          // minBucketWidth: 50,
                                          // maxRaw: 500,
                                          maxPixels: 3000000000})
                                          .setSeriesNames(['Area (ha.)'])
                                          .setOptions({title: 'forest characteristics', 
                                          hAxis: {title: 'Binary Classification'}, 
                                          vAxis: {title: 'Area (hectares)'}}); 

print(change_chart);

// Quantify changes from mining using mining footprints using the following 
// code: https://code.earthengine.google.com/?scriptPath=users%2FMCD12Q1_landcover%2FCarbonSlider%3AGalamsey_GFW_change --> contains both RAMI and Galamsey mining extents

// Determine forest cover within mining alert area for 2015
var footprintlist = footprints.toList(footprints.size());
// (0=2015) - (9=2024)
var MiningAlertArea = ee.Image(footprintlist.get(0));
Map.addLayer(MiningAlertArea, {}, 'mining tiff');
var activeMiningArea = MiningAlertArea.updateMask(MiningAlertArea.eq(1));

var MiningForest2014 = GFW14.updateMask(MiningAlertArea);
Map.addLayer(MiningForest2014, forestpal, 'starting forest');
var Miningvector = activeMiningArea.reduceToVectors({
  scale: 10,
  geometryType: 'polygon',
  maxPixels: 1337987827
});
Map.addLayer(Miningvector);
var startingfc_chart = ui.Chart.image.histogram({image: MiningForest2014,
                                          region: Miningvector,
                                          scale: 100,
                                          // maxBuckets: 100,
                                          // minBucketWidth: 50,
                                          // maxRaw: 500,
                                          maxPixels: 3000000000})
                                          .setSeriesNames(['Area (ha.)'])
                                          .setOptions({title: '2014 Forest cover within 2015 mining extent', 
                                          hAxis: {title: 'Binary Classification'}, 
                                          vAxis: {title: 'Area (hectares)'}}); 

print(startingfc_chart);
