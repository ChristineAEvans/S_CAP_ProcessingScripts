/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var hansen = ee.Image("UMD/hansen/global_forest_change_2024_v1_12");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// The following Google Earth Engine Scripts ingests the most up to date Hansen Global Forest Change product (*currently) Hansen Global Forest Change v1.12 (2000-2024)
// Hansen, M. C., P. V. Potapov, R. Moore, M. Hancher, S. A. Turubanova, A. Tyukavina, D. Thau, S. V. Stehman, S. J. Goetz, T. R. Loveland, A. Kommareddy, A. Egorov, L. Chini, C. O. Justice, and J. R. G. Townshend.
// "High-Resolution Global Maps of 21st-Century Forest Cover Change." Science 342 (15 November): 850-53. 10.1126/science.1244693 Data available on-line at: https://glad.earthengine.app/view/global-forest-change.
// We used two bands: "treecover2000" or "lossyear" 
// Script Author: Christne Evans (cae0004@uah.edu) 
// Copied over: 06/25/2025

// [] is a global coverage dataset with a spacial resolution of 30.92 meters. Can be used on roi of choice.
// National scale roi sourced fromThe United States Office of the Geographer provides the Large Scale International Boundary (LSIB) dataset (ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"))
// Define ROI & filter with name of country of interest
var roi = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017").filter(ee.Filter.inList('country_na', ['Ghana'])); 
var outline4 = ee.Image().byte().paint({featureCollection:roi,width:2});
Map.addLayer(outline4, {palette: ['black']},'AOI', true);

// Center console to match ROI
Map.centerObject(roi, 8);

// Using "treecover2000" allows one to adjust for nationally reported tree canopy cover % 
// the following code uses the provided tree canopy cover to find tree extent for 2000 and removes annual forest losses from years specified leaving a new forest cover to begin our analysis with
//////////////////////////////////
// J. Abramowitz, 7/13/2022
// Creating a year 2000 and year 2020 forest mask from Hansen year 2000 percent tree cover layer
// This script only takes forest loss into account, assuming forests are only getting smaller over time
// and therefore may not be appropriate for areas with signifacnt post-2000 forest gain (ie Nepal)
// Note: this script was adapted from "Forest Cover and Loss Estimation" tutorial (https://developers.google.com/earth-engine/tutorials/community/forest-cover-loss-estimation)
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Set up variables for proper visualization in GEE
var prj = hansen.projection();
var scale = prj.nominalScale();

// Determine minimum percent canopy cover in 2000 to be defined as "forest" (FAO definition is 10%)
var canopy_perc = 15; // Ghana national definition is minimum 15%

Map.addLayer(roi, {},'ROI');

// Create year 2000 forest mask based on defined minimum canopy percentage
var mask_2000 = hansen.select("treecover2000").gt(canopy_perc).updateMask(hansen.select("treecover2000").gt(canopy_perc)).clip(roi);
Map.addLayer(mask_2000.reproject(prj.atScale(scale)),{palette:['4caf50']},">30% Forest Mask (2000)",false);

// Uncomment this to view % tree cover for year 2000 on map and with inspector
// Map.addLayer(hansen.select("treecover2000"),{},"Tree Cover % (2000), for inspection",false);

// Uncomment this line to validate loss year using inspector on pixels of interest
// Map.addLayer(hansen.select("lossyear"),{},"Loss Year",false)

// Mask to only include loss years < 21 (means deforestation from 2000 to 2020) and mask again to only include areas that were >10% CC in 2000
var deforest = hansen.select('lossyear').lt(14).updateMask(hansen.select('lossyear').lt(14)).updateMask(mask_2000).clip(roi); // swap .lt(xyz) for year of interest
Map.addLayer(deforest.reproject(prj.atScale(scale)),{palette:'red'},"Deforestation (2000 - 2009)",false);


// Uncomment next two lines to check that 2021 deforestation is excluded
// var deforest_2021 = hansen.select('lossyear').eq(21).updateMask(mask_2000).clip(roi);
// Map.addLayer(deforest_2021,{},"Check that 2021 deforestation is excluded");

// Unmask deforestation (2000-2020) layer and mask to inlude only areas without deforestation
var deforest_unmask = deforest.unmask();

var no_deforest = deforest_unmask.eq(0).updateMask(deforest_unmask.eq(0));

// Mask the orginal (2000) forest mask by the areas within it that were not deforested between 2000 and 2020 to get new (2020) forest mask
var mask_20xx = mask_2000.updateMask(no_deforest);
var fcoverage_chart = ui.Chart.image.histogram({image: mask_20xx.unmask().clip(roi),
                                          region: roi,
                                          scale: 100,
                                          // maxBuckets: 100,
                                          // minBucketWidth: 50,
                                          // maxRaw: 500,
                                          maxPixels: 3000000000})
                                          .setSeriesNames(['Area (ha.)'])
                                          .setOptions({title: 'forest area 20xx', 
                                          hAxis: {title: 'Binary Classification'}, 
                                          vAxis: {title: 'Area (hectares)'}}); 

print(fcoverage_chart);

Map.addLayer(mask_2000.reproject(prj.atScale(scale)),{palette:'2e6930'},">10% Forest Mask (20xx)",false);

print("Note: Change pyramiding policy to 'MODE' for proper viewing of exported asset.");
//Export the 2000 asset
Export.image.toAsset({
  image: mask_2000,
  description: '2000_mask_guatemala',
  assetId: '2000_mask_guatemala',
  scale: 30,
  region: roi,
  maxPixels: 10e12
});

Map.setOptions("SATELLITE");

//Export the specified year of forest cover 
Export.image.toAsset({
  image: mask_20xx.unmask().clip(roi),
  description: 'Forest2014_WA',
  assetId: 'SCO_WA/Galamsey/Forest2014_WA',
  scale: 30,
  region: roi,
  maxPixels: 10e12
});
/////////////////////////////////
// Generated extents can then be used to estimate tree cover loss
var forestCoverageA = mask_2000.unmask().clip(roi);
var forestCoverageB = mask_20xx.unmask().clip(roi);
var forestpal = {"opacity":1,"bands":["treecover2000"],"min":0,"max":1,"palette":["FFFFFF","078b12"]};
Map.addLayer(forestCoverageA, forestpal, 'Year A');
Map.addLayer(forestCoverageB, forestpal, 'Year B');
// Determine annual Forest Change Characterics of all causes by subtracting the two years of interest. 
// "-1": forest loss, "0": No Change ... if subtracting prior year from "current" year
var LCCoverageChange = forestCoverageB.subtract(forestCoverageA);
Map.addLayer(LCCoverageChange, {}, 'Change Characteristics', true);
// quantify changes within desired aoi (ROI) -- this is all change from forest, not just mining
// 100x100 meters = 1 ha.
var change_chart = ui.Chart.image.histogram({image: LCCoverageChange.unmask().clip(roi),
                                          region: roi,
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


// The Hansen product also provides a "lossyear" band which generates loss of tree cover per year using their own tree canopy cover specifications.
// This estimate differs from that above as it will not match the nationally specified definition for forest cover canopy %
// contains losses from 0-24
var change_chart2 = ui.Chart.image.histogram({image: hansen.select('lossyear').clip(roi),
                                          region: roi,
                                          scale: 100,
                                          // maxBuckets: 100,
                                          // minBucketWidth: 50,
                                          // maxRaw: 500,
                                          maxPixels: 3000000000})
                                          .setSeriesNames(['Area (ha.)'])
                                          .setOptions({title: 'loss year characteristics', 
                                          hAxis: {title: 'Binary Classification'}, 
                                          vAxis: {title: 'Area (hectares)'}}); 

print(change_chart2);