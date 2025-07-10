// The following Google Earth Engine Scripts ingests nationally shared land use land cover datasets from the El Ministerio de Agricultura, Ganadería y Alimentación de Guatemala (MAGA)

// Script Author: Christne Evans (cae0004@uah.edu) 
// Copied over: 06/25/2025

// National scale roi sourced from The United States Office of the Geographer provides the Large Scale International Boundary (LSIB) dataset (ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"))

// Define ROI & filter with name of country of interest
var roi = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017").filter(ee.Filter.inList('country_na', ['Guatemala'])); 
var outline4 = ee.Image().byte().paint({featureCollection:roi,width:2});
Map.addLayer(outline4, {palette: ['black']},'AOI', true);

// Center console to match ROI
Map.centerObject(roi, 8);

// MAGA:1991-2001: projects/ee-christineaevans/assets/MAGA/Guatemala_Change_1991_2001 & 2010-2016: projects/ee-christineaevans/assets/MAGA/Guatemala_Change_2010_2016
// Asset range: 1991-2016
var MAGAx = ee.Image('projects/ee-christineaevans/assets/MAGA/Guatemala_Change_1991_2001');
var MAGAy = ee.Image('projects/ee-christineaevans/assets/MAGA/Guatemala_Change_2010_2016');
var MAGAz = ee.Image('projects/servir-sco-assets/assets/SCO_CA/ForestMask/gt_bosque_2020_maga').unmask(); // only contains F/NF
// "MAGAx" & "MAGAy" contain 8 classes: "Forest": 1, "Non Forest": 2, "Loss": 3, "Gain": 4, "Water": 5/6/7/8
// Reclassify groups into forest / nonforest; combine forest and gain
var MAGAx_Forest = MAGAx.remap([1, 2, 3, 4, 5, 6, 7, 8], [1, 0, 0, 1, 0, 0, 0, 0]);
// Select only the pixels with value 1, for forest and mask out all other pixels
var MAGAx_Forestx = MAGAx_Forest.eq(1); 
var MAGAx_ForForestx = MAGAx_Forest.updateMask(MAGAx_Forestx);
// Reclassify groups into forest / nonforest; combine forest and gain
var MAGAy_Forest = MAGAy.remap([1, 2, 3, 4,5], [1, 0, 0, 1,0]);
// Select only the pixels with value 1, for forest and mask out all other pixels
var MAGAy_Foresty = MAGAy_Forest.eq(1);
var MAGAy_ForForesty = MAGAy_Forest.updateMask(MAGAy_Foresty);
//Map.addLayer(MAGAy_Foresty, {palette:['green']}, 'MAGA - 2016 Forest', true);
// Subtract year "y" from year "x" to decifer what type of change, if any, occured during the timeframe
var MAGA_ForestChange = MAGAx_Forestx.subtract(MAGAy_Foresty);
// "MAGA_ForestChange" will provide values of "no change" : 0, "deforestation": 1, and "growth" : -1
// Select only the pixels with value 1, for deforestation and mask out all other pixels
var MAGA_ForestLoss = MAGA_ForestChange.eq(1);
var MAGA_MaskedForLoss = MAGA_ForestChange.updateMask(MAGA_ForestLoss);
// Add deforestation raster to the GEE map
Map.addLayer(MAGA_MaskedForLoss.clip(roi), {palette:['red']}, 'MAGA - Forest Loss', true);
var MAGA_chart = ui.Chart.image.histogram({image: MAGA_ForestLoss.clip(roi),region: roi,scale: 100, maxPixels: 3000000000}).setSeriesNames(['Area (ha.)']).setOptions({title: 'Guatemala Forest Loss',hAxis: {title: 'Binary Classification'},vAxis: {title: 'Area (hectares)'}}); 
print(MAGA_chart);
