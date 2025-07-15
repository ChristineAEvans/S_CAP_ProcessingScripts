// The following Google Earth Engine Scripts ingests the annual ESA WorldCover product provided by the the European Space Agency WorldCover Project (https://esa-worldcover.org/en/data-access)
// The orininally classification values, color codes, and description can be found at https://esa-worldcover.s3.eu-central-1.amazonaws.com/v100/2020/docs/WorldCover_PUM_V1.0.pdf & https://esa-worldcover.s3.eu-central-1.amazonaws.com/v200/2021/docs/WorldCover_PUM_V2.0.pdf
// GEE application for visualization and comparisons (https://vitorsveg.users.earthengine.app/view/worldcover)

// Script Author: Christne Evans (cae0004@uah.edu) 
// Copied over: 04/21/2025

// ESA WorldCover 10m v100 (2020) & v200 (2021) is a global coverage dataset derived from ESA Sentinel-2 imagery with a spacial resolution of 10 meters. Can be used on roi of choice.
// National scale roi sourced from The United States Office of the Geographer provides the Large Scale International Boundary (LSIB) dataset (ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"))

// Define ROI & filter with name of country of interest
var roi = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017").filter(ee.Filter.inList('country_na', ['Thailand'])); 
var outline4 = ee.Image().byte().paint({featureCollection:roi,width:2});
Map.addLayer(outline4, {palette: ['black']},'AOI', true);

// Center console to match ROI
Map.centerObject(roi, 8);

// Ingest ESRI 10m Annual Land Cover data for years of interest; visualize over roi
var esa_lulc10_2020 =  ee.ImageCollection("ESA/WorldCover/v100").first()
var esa_lulc10_2021 = ee.ImageCollection("ESA/WorldCover/v200").first()


// Classication Scheme
// Value | Color Value	Description
// 10 | #006400	| Tree cover
// 20 | #ffbb22 | Shrubland
// 30	| #ffff4c| Grassland
// 40 |	#f096ff	| Cropland
// 50 | #fa0000	| Built-up
// 60 |	#b4b4b4	| Bare / sparse vegetation
// 70 |	#f0f0f0	| Snow and ice
// 80 |	#0064c8	| Permanent water bodies
// 90 |	#0096a0	| Herbaceous wetland
// 95	| #00cf75	| Mangroves
// 100 | #fae6a0 | Moss and lichen

var visualization = { bands: ['Map'],};


// Add image to the map


Map.addLayer(esa_lulc10_2020.clip(roi), visualization, 'ESA WorldCover 10m 2020' , true); // Replace with year of interest
Map.addLayer(esa_lulc10_2021.clip(roi), visualization, 'ESA WorldCover 10m 2021' , true); // Replace with year of interest

// Reclassify oringal landcover scheme to forest/non-forest (1/0) "ESRI10_Reclass[yr]"
var esa10_Reclass2020 = esa_lulc10_2020.remap([10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 100], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var esa10_Reclass2021 = esa_lulc10_2021.remap([10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 100], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

// Generate forest cover change layer between the two years by subtracting the second year from the prior year. 
var Change = esa10_Reclass2020.subtract(esa10_Reclass2021);
// Map.addLayer(Change, {min: -1.0, max: 1.0, palette: ['33ffe0', '676868', 'dd3d26']}, 'Change Layer');
var Gain = Change.eq(-1);
var Loss = Change.eq(1); 
var NoChange = Change.eq(0);

// Use a histogram to resample and estimate quanity of each change type; print to console
var esa10m_worlcover_chart = ui.Chart.image.histogram({image: Loss.clip(roi),region: roi,scale: 100, maxPixels: 3000000000}).setSeriesNames(['Area (ha.)']).setOptions({title: 'ESA WorldCover 10m Forest Loss',hAxis: {title: 'Binary Classification'},vAxis: {title: 'Area (hectares)'}}); 
print(esa10m_worlcover_chart);

