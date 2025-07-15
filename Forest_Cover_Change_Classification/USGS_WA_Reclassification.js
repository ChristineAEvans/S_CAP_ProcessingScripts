// The following Google Earth Engine Scripts ingests the West AFrica land use and land cover maps generated through USGS. 
// https://www.usgs.gov/centers/eros/science/land-use-and-land-cover-trends-west-africa#overview
// spatial resolution: 2-km 
// Script Author: Christne Evans (cae0004@uah.edu) 
// Copied over: 06/30/2025

// date coverage: 1975, 2000, 2013, 2018
// reclassification to forest (1)/nonforest (0);

// National scale roi sourced from The United States Office of the Geographer provides the Large Scale International Boundary (LSIB) dataset (ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"))
// Define ROI & filter with name of country of interest
var roi = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017").filter(ee.Filter.inList('country_na', ['Ghana'])); 
var outline4 = ee.Image().byte().paint({featureCollection:roi,width:2});
Map.addLayer(outline4, {palette: ['black']},'AOI', true);


// data source: https://www.usgs.gov/data/west-africa-land-use-land-cover-time-series
// https://doi.org/10.5066/F73N21JF
// user manual: https://doi.org/10.3133/ofr20171012

var WA13 = ee.Image("projects/servir-wa/compil_ecosys/terrestrial/wa_lc_usgs_2013"),
    WA00 = ee.Image("projects/ee-christineaevans/assets/wa_lc_usgs_2000"),
    WA18 = ee.Image("projects/ee-christineaevans/assets/wa_lc_for_usgs_2018");
    
// Center console to match ROI
Map.centerObject(roi, 8);

var viz_wa_lc = {min:0, max:32, palette: ["ffffff", "8400a8", "8bad8b","000080","ffcc99","ffffff","808000","33cccc","ffff96",
  "3366ff","ff99cc","969696","a87000","ff0000","ccff66","a95ce6", "ffffff","ffffff","ffffff", "ffffff","ffffff",
  "d296e6", "a83800","f5a27a","ebc961", "28734b","ffffff","ebdf73", "beffa6","a6c28c","ffffff","0a9696","749373"]};
Map.addLayer(WA13, viz_wa_lc, '2013');
Map.addLayer(WA00, viz_wa_lc, '2000');
Map.addLayer(WA18.unmask(), viz_wa_lc, '2018');

// reclassify to forest/nonforest
var RC_Ghana00 = WA00.remap(
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
  [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var RC_Ghana13 = WA13.remap(
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
  [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var RC_Ghana18 = WA18.remap(
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
  [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var Ghanapalf = {
  min: 0, 
  max: 1,
  palette:['54a708']};
  
var Ghana_Forest00 = RC_Ghana00.eq(1); 
var Ghana_Forest13 = RC_Ghana13.eq(1); 
var G_MaskedFC00 = WA00.updateMask(Ghana_Forest00);
var G_MaskedFC13 = WA13.updateMask(Ghana_Forest13);
Map.addLayer(G_MaskedFC00.clip(roi), Ghanapalf, 'Ghana Forest 00', false);
Map.addLayer(G_MaskedFC13.clip(roi), Ghanapalf, 'Ghana Forest 13', false);
// Calculate Forest Loss
var Ghana_forestloss = Ghana_Forest00.subtract(Ghana_Forest13);
var GFL = Ghana_forestloss.eq(1); //we will use this to mask out nf and water
var Ghana_MaskedFL = Ghana_forestloss.updateMask(GFL);
Map.addLayer(Ghana_MaskedFL.clip(roi), {palette:['red']}, 'Ghana Forest loss', true);
// Follow Up LULC
var FollowUp_LULC_Ghana = WA13.mask(Ghana_MaskedFL).clip(roi);
Map.addLayer(FollowUp_LULC_Ghana,viz_wa_lc, 'Converted Ghana LULC');
var Change_Chart = ui.Chart.image.histogram({image: GFL.unmask().clip(roi),region: roi,scale: 100, maxPixels: 304216963968}).setSeriesNames(['Area (ha.)']).setOptions({title: 'USGS Forest Loss',hAxis: {title: 'Binary Classification'},vAxis: {title: 'Area (hectares)'}}); 
print(Change_Chart);
