// The following Google Earth Engine Scripts ingests the annual MCD12Q1.061 MODIS Land Cover Type Yearly Global 500m product provided by the NASA LP DAAC ath the USGS EROS Center (https://doi.org/10.5067/MODIS/MCD12Q1.061)
// We utilized the Land Cover Type 1: Annual International Geosphere-Biosphere Programme (IGBP) classification [LC_Type 1] which contains 17 classes of land cover, globally.  

// The orininally classification values, color codes, and description can be found at https://developers.google.com/earth-engine/datasets/catalog/MODIS_061_MCD12Q1. 

// Script Author: Christne Evans (cae0004@uah.edu) 
// Copied over: 04/08/2025

// MCD12Q1.061 (ee.ImageCollection("MODIS/061/MCD12Q1")) is a global coverage dataset with a spacial resolution of 500 meters. Can be used on roi of choice.
// National scale roi sourced fromThe United States Office of the Geographer provides the Large Scale International Boundary (LSIB) dataset (ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"))

// Define ROI & filter with name of country of interest
var roi = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017").filter(ee.Filter.inList('country_na', ['Guatemala'])); 
var outline4 = ee.Image().byte().paint({featureCollection:roi,width:2});
Map.addLayer(outline4, {palette: ['black']},'AOI', true);

// Center console to match ROI
Map.centerObject(roi, 8);

// Ingest MCD2Q1.06 data for years of interest; visualize over roi
var LCdatasetxx = ee.ImageCollection('MODIS/061/MCD12Q1').filterDate('2001-01-01', '2001-12-31'); // Filter with starting year
var LCdatasetyy = ee.ImageCollection('MODIS/061/MCD12Q1').filterDate('2002-01-01', '2002-12-31'); // Filter with ending year
var igbpLandCoverxx = LCdatasetxx.select('LC_Type1').median();
var igbpLandCoveryy = LCdatasetyy.select('LC_Type1').median();

// Classication Scheme
// 1	#05450a	Evergreen Needleleaf Forests: dominated by evergreen conifer trees (canopy >2m). Tree cover >60%.
// 2	#086a10	Evergreen Broadleaf Forests: dominated by evergreen broadleaf and palmate trees (canopy >2m). Tree cover >60%.
// 3	#54a708	Deciduous Needleleaf Forests: dominated by deciduous needleleaf (larch) trees (canopy >2m). Tree cover >60%.
// 4	#78d203	Deciduous Broadleaf Forests: dominated by deciduous broadleaf trees (canopy >2m). Tree cover >60%.
// 5	#009900	Mixed Forests: dominated by neither deciduous nor evergreen (40-60% of each) tree type (canopy >2m). Tree cover >60%.
// 6	#c6b044	Closed Shrublands: dominated by woody perennials (1-2m height) >60% cover.
// 7	#dcd159	Open Shrublands: dominated by woody perennials (1-2m height) 10-60% cover.
// 8	#dade48	Woody Savannas: tree cover 30-60% (canopy >2m).
// 9	#fbff13	Savannas: tree cover 10-30% (canopy >2m).
// 10	#b6ff05	Grasslands: dominated by herbaceous annuals (<2m).
// 11	#27ff87	Permanent Wetlands: permanently inundated lands with 30-60% water cover and >10% vegetated cover.
// 12	#c24f44	Croplands: at least 60% of area is cultivated cropland.
// 13	#a5a5a5	Urban and Built-up Lands: at least 30% impervious surface area including building materials, asphalt and vehicles.
// 14	#ff6d4c	Cropland/Natural Vegetation Mosaics: mosaics of small-scale cultivation 40-60% with natural tree, shrub, or herbaceous vegetation.
// 15	#69fff8	Permanent Snow and Ice: at least 60% of area is covered by snow and ice for at least 10 months of the year.
// 16	#f9ffa4	Barren: at least 60% of area is non-vegetated barren (sand, rock, soil) areas with less than 10% vegetation.
// 17	#1c0dff	Water Bodies: at least 60% of area is covered by permanent water bodies.

var igbpLandCoverVis = {min: 1.0, max: 17.0, palette: ['05450a', '086a10', '54a708', '78d203', '009900', 'c6b044', 'dcd159',
    'dade48', 'fbff13', 'b6ff05', '27ff87', 'c24f44', 'a5a5a5', 'ff6d4c', '69fff8', 'f9ffa4', '1c0dff'],};

Map.addLayer(igbpLandCoverxx.clip(roi), igbpLandCoverVis, 'XX - Original Landcover', true); // Replace "xx" with year 
Map.addLayer(igbpLandCoveryy.clip(roi), igbpLandCoverVis, 'YY - Original Landcover', true); // Replace "yy" with year 

// Reclassify oringal landcover scheme to forest/non-forest (1/0) "MODIS_Reclass[yr]"
var MODIS_Reclass01 = igbpLandCoverxx.remap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var MODIS_Reclass02 = igbpLandCoveryy.remap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

// Generate forest cover change layer between the two years by subtracting the second year from the prior year. 
var Change = MODIS_Reclass01.subtract(MODIS_Reclass02);
// Optional Visualization -- Map.addLayer(Change, {min: -1.0, max: 1.0, palette: ['33ffe0', '676868', 'dd3d26']}, 'Change Layer');
var Gain = Change.eq(-1);
var Loss = Change.eq(1); 
var NoChange = Change.eq(0);

// Use a histogram to resample and estimate quanity of each change type; print to console
var MODIS_ChangeChart = ui.Chart.image.histogram({image: Change.clip(roi),region: roi,scale: 100, maxPixels: 3000000000}).setSeriesNames(['Area (ha.)']).setOptions({title: 'MODIS Forest Loss, xx-yy',hAxis: {title: 'Binary Classification'},vAxis: {title: 'Area (hectares)'}}); 
print(MODIS_ChangeChart);