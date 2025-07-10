/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var countries = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    SERVIR_WA = ee.FeatureCollection("projects/ee-christineaevans/assets/CompleteWestAfricaPhase2"),
    ROI = ee.FeatureCollection("projects/servir-sco-assets/assets/SCO_WA/roi_ghana"),
    hansen = ee.Image("UMD/hansen/global_forest_change_2024_v1_12");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
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

// Switch out ROI here for your study area
var roi = ROI
//countries.filter(ee.Filter.eq('country_na', 'Cambodia'));
// var roi_frame = ee.Image().byte().paint({featureCollection:roi,width:2}); // this line is for visualizing ROI border on map
// Map.addLayer(roi_frame,{},"ROI",false);
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
var mask_2010 = mask_2000.updateMask(no_deforest);
var fcoverage_chart = ui.Chart.image.histogram({image: mask_2010.unmask().clip(ROI),
                                          region: ROI,
                                          scale: 100,
                                          // maxBuckets: 100,
                                          // minBucketWidth: 50,
                                          // maxRaw: 500,
                                          maxPixels: 3000000000})
                                          .setSeriesNames(['Area (ha.)'])
                                          .setOptions({title: 'forest area 14', 
                                          hAxis: {title: 'Binary Classification'}, 
                                          vAxis: {title: 'Area (hectares)'}}); 

print(fcoverage_chart);

Map.addLayer(mask_2000.reproject(prj.atScale(scale)),{palette:'2e6930'},">10% Forest Mask (2010)",false);

print("Note: Change pyramiding policy to 'MODE' for proper viewing of exported asset.");
// Export the 2000 asset
// Export.image.toAsset({
//   image: mask_2000,
//   description: '2000_mask_guatemala',
//   assetId: '2000_mask_guatemala',
//   scale: 30,
//   maxPixels: 10e12
// });

// Map.setOptions("SATELLITE");

// Export the 2020 
Export.image.toAsset({
  image: mask_2010.unmask().clip(ROI),
  description: 'Forest2014_WA',
  assetId: 'SCO_WA/Galamsey/Forest2014_WA',
  scale: 30,
  region: ROI,
  maxPixels: 10e12
});
