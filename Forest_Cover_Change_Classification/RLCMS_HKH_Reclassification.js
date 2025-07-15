// The following Google Earth Engine Scripts ingests the Regional Land Cover Monitoring System land use land cover datasets; developed through SERVIR-HKH & ICIMOD
// The Regional Land Cover Monitoring System (RLCMS) for the Hindu Kush Himalaya (HKH) region is an operational service that provides 
// annual land cover mapping and change analysis services; For more information, please visit https://servir.icimod.org/science-applications/regional-land-cover-monitoring-system-for-the-hindu-kush-himalaya

// Script Author: Christne Evans (cae0004@uah.edu) 
// Copied over: 06/30/2025

var RLCMS = ee.ImageCollection("projects/servir-hkh/RLCMS/HKH/landcover"); // original data can be found here: https://geoapps.icimod.org/RLCMS/ 
// date coverage: 2000 2021
var RLCMS_list = RLCMS.toList(RLCMS.size());
print(RLCMS_list);
var RLCMS0 = ee.Image(RLCMS_list.get(0));
var RLCMS1 = ee.Image(RLCMS_list.get(1));
var RLCMS2 = ee.Image(RLCMS_list.get(2));
var RLCMS3 = ee.Image(RLCMS_list.get(3));
var RLCMS4 = ee.Image(RLCMS_list.get(4));
var RLCMS5 = ee.Image(RLCMS_list.get(5));
var RLCMS6 = ee.Image(RLCMS_list.get(6));
var RLCMS7 = ee.Image(RLCMS_list.get(7));
var RLCMS8 = ee.Image(RLCMS_list.get(8));
var RLCMS9 = ee.Image(RLCMS_list.get(9));
var RLCMS10 = ee.Image(RLCMS_list.get(10));
var RLCMS11 = ee.Image(RLCMS_list.get(11));
var RLCMS13 = ee.Image(RLCMS_list.get(12));
var RLCMS14 = ee.Image(RLCMS_list.get(13));
var RLCMS15 = ee.Image(RLCMS_list.get(14));
var RLCMS16 = ee.Image(RLCMS_list.get(15));
var RLCMS17 = ee.Image(RLCMS_list.get(16));
var RLCMS18 = ee.Image(RLCMS_list.get(17));
var RLCMS19 = ee.Image(RLCMS_list.get(18));
var RLCMS20 = ee.Image(RLCMS_list.get(19));
var RLCMS21 = ee.Image(RLCMS_list.get(20));

// reclassification to forest (1)/nonforest (0); // 4: forest
// user guide: https://geoapps.icimod.org/RLCMS/static/main/downloads/user_guide_rlcms.pdf
var RC_00 = RLCMS0.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]);
var RC_01 = RLCMS1.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]);
var RC_02 = RLCMS2.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]);
var RC_03 = RLCMS3.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]);
var RC_04 = RLCMS4.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]);
var RC_05 = RLCMS5.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]);
var RC_06 = RLCMS6.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]);
var RC_07 = RLCMS7.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]);
var RC_08 = RLCMS8.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]);
var RC_09 = RLCMS9.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]);
var RC_10 = RLCMS10.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]);
var RC_11 = RLCMS11.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]);
var RC_13 = RLCMS13.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]);
var RC_14 = RLCMS14.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]);
var RC_15 = RLCMS15.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]);
var RC_16 = RLCMS16.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]);
var RC_17 = RLCMS17.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]);
var RC_18 = RLCMS18.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]);
var RC_19 = RLCMS19.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]);
var RC_20 = RLCMS20.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]);
var RC_21 = RLCMS21.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]);

// National scale roi sourced from The United States Office of the Geographer provides the Large Scale International Boundary (LSIB) dataset (ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"))

// Define ROI & filter with name of country of interest
var roi = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017").filter(ee.Filter.inList('country_na', ['Nepal'])); 
var outline4 = ee.Image().byte().paint({featureCollection:roi,width:2});
Map.addLayer(outline4, {palette: ['black']},'AOI', true);

// Center console to match ROI
Map.centerObject(roi, 8);

var yearX = RC_00;
var yearY = RC_19;
var Subtraction = yearX.subtract(yearY);
var Loss = Subtraction.eq(1); 
var RLCMS_Loss = Subtraction.updateMask(Loss);
Map.addLayer(RLCMS_Loss.clip(roi), {palette:['blue']}, 'RLCMS - Forest Loss', true);
var RLCMS_Chart = ui.Chart.image.histogram({image: RLCMS_Loss.unmask().clip(roi),region: roi,scale: 100, maxPixels: 304216963968}).setSeriesNames(['Area (ha.)']).setOptions({title: 'RLCMS Forest Loss',hAxis: {title: 'Binary Classification'},vAxis: {title: 'Area (hectares)'}}); 
print(RLCMS_Chart);
