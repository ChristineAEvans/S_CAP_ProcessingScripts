// The following Google Earth Engine Scripts ingests the annual Global 3-class/4-class Forest/Non-Forest product provided by JAXA (https://earth.jaxa.jp/en/data/2555/index.html)
// The orininally classification values, color codes, and description can be found at https://www.eorc.jaxa.jp/ALOS/en/dataset/fnf_e.htm

// Script Author: Christne Evans (cae0004@uah.edu) 
// Copied over: 04/21/2025

// The Global 3-class PALSAR-2/PALSAR Forest/Non-Forest Map & Global 4-class PALSAR-2/PALSAR Forest/Non-Forest Map is a global coverage dataset derived by classifying PALSAR-2 imagery at a 25m spatial resolution.
// "forest" is defined as the natural forest with the area larger than 0.5 ha and forest cover over 10% ... Can be used on roi of choice.
// National scale roi sourced from The United States Office of the Geographer provides the Large Scale International Boundary (LSIB) dataset (ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"))

// Define ROI & filter with name of country of interest
var roi = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017").filter(ee.Filter.inList('country_na', ['Ghana'])); 
var outline4 = ee.Image().byte().paint({featureCollection:roi,width:2});
Map.addLayer(outline4, {palette: ['black']},'AOI', true);

// Center console to match ROI
Map.centerObject(roi, 8);

// Ingest JAXA PALSAR product Land Cover data for years of interest; visualize over roi
var fnf7 = ee.ImageCollection('JAXA/ALOS/PALSAR/YEARLY/FNF').filterDate('2007-01-01', '2007-12-31').select('fnf').median(); // Start Year
var fnf8 = ee.ImageCollection('JAXA/ALOS/PALSAR/YEARLY/FNF').filterDate('2008-01-01', '2008-12-31').select('fnf').median(); // Start Year
var fnf9 = ee.ImageCollection('JAXA/ALOS/PALSAR/YEARLY/FNF').filterDate('2009-01-01', '2009-12-31').select('fnf').median(); // Start Year
var fnf10 = ee.ImageCollection('JAXA/ALOS/PALSAR/YEARLY/FNF').filterDate('2010-01-01', '2010-12-31').select('fnf').median(); // Start Year
var fnf15 = ee.ImageCollection("JAXA/ALOS/PALSAR/YEARLY/FNF").filterDate('2015-01-01', '2015-12-31').select('fnf').median(); // End Year
var fnf16 = ee.ImageCollection("JAXA/ALOS/PALSAR/YEARLY/FNF").filterDate('2016-01-01', '2016-12-31').select('fnf').median(); // End Year
var fnf17 = ee.ImageCollection("JAXA/ALOS/PALSAR/YEARLY/FNF4").filterDate('2017-01-01', '2017-12-31').select('fnf').median(); // End Year
var fnf18 = ee.ImageCollection("JAXA/ALOS/PALSAR/YEARLY/FNF4").filterDate('2018-01-01', '2018-12-31').select('fnf').median(); // End Year
var fnf19 = ee.ImageCollection("JAXA/ALOS/PALSAR/YEARLY/FNF4").filterDate('2019-01-01', '2019-12-31').select('fnf').median(); // End Year
var fnf20 = ee.ImageCollection("JAXA/ALOS/PALSAR/YEARLY/FNF4").filterDate('2020-01-01', '2020-12-31').select('fnf').median(); // End Year

// Define a dictionary which will be used to make legend and visualize image on map
// Classication Scheme Global 3-class PALSAR-2/PALSAR Forest/Non-Forest Map
// 'fnf' band
// 1	#006400	Forest
// 2	#feff99	Non-Forest
// 3	#0000ff	Water
var forestNonForestVis = {
  min: 1,
  max: 3,
  palette: ['006400', 'feff99', '0000ff'],
};
// Classification Scheme Global 4-class PALSAR-2/PALSAR Forest/Non-Forest Map 
// 'fnf' band
// 1	#00b200	Dense Forest
// 2	#83ef62	Non-dense Forest
// 3	#ffff99	Non-Forest
// 4	#0000ff	Water
var forestNonForestVis2 = {
  min: 1,
  max: 4,
  palette: ['00b200','83ef62','ffff99','0000ff'],
};

// Add image to the map
Map.addLayer(fnf19.clip(roi), forestNonForestVis2, 'JAXA F/NF [yr]' , true); // Replace with year of interest
Map.addLayer(fnf20.clip(roi), forestNonForestVis2, 'JAXA F/NF [yr]' , true); // Replace with year of interest

// Reclassify oringal landcover scheme to forest/non-forest (1/0) "ESRI10_Reclass[yr]"
var JAXA7 = fnf7.remap([1, 2, 3], [1, 0, 0]);
var JAXA8 = fnf8.remap([1, 2, 3], [1, 0, 0]);
var JAXA9 = fnf9.remap([1, 2, 3], [1, 0, 0]);
var JAXA10 = fnf10.remap([1, 2, 3], [1, 0, 0]);
var JAXA15 = fnf15.remap([1, 2, 3], [1, 0, 0]);
var JAXA16 = fnf16.remap([1, 2, 3], [1, 0, 0]);
var JAXA17 = fnf17.remap([1, 2, 3, 4], [1, 1, 0, 0]);
var JAXA18 = fnf18.remap([1, 2, 3, 4], [1, 1, 0, 0]);
var JAXA19 = fnf19.remap([1, 2, 3, 4], [1, 1, 0, 0]);
var JAXA20 = fnf20.remap([1, 2, 3, 4], [1, 1, 0, 0]);

// Generate forest cover change layer between the two years by subtracting the second year from the prior year. 
var Change = JAXA19.subtract(JAXA20);
// Optional Visualization -- 
Map.addLayer(Change.clip(roi), {min: -1.0, max: 1.0, palette: ['33ffe0', '676868', 'dd3d26']}, 'Change Layer');
var Gain = Change.eq(-1);
var Loss = Change.eq(1); 
var NoChange = Change.eq(0);

// Use a histogram to resample and estimate quanity of each change type; print to console
var JAXA_Chart = ui.Chart.image.histogram({image: Loss,region: roi,scale: 100, maxPixels: 3000000000}).setSeriesNames(['Area (ha.)']).setOptions({title: 'JAXA Forest loss, [yr1 - yr2]',hAxis: {title: 'Binary Classification'},vAxis: {title: 'Area (hectares)'}}); 
print(JAXA_Chart);

