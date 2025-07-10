// The following Google Earth Engine Scripts ingests annual land cover data provided by the 
// Regional Centre for Mapping of Resources for Development (RCMRD)

// Script Author: Christne Evans (cae0004@uah.edu) 
// Copied over: 06/25/2025

// National scale roi sourced from The United States Office of the Geographer provides the Large Scale International Boundary (LSIB) dataset (ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"))

// Define ROI & filter with name of country of interest
var roi = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017").filter(ee.Filter.inList('country_na', ['Kenya'])); 
var outline4 = ee.Image().byte().paint({featureCollection:roi,width:2});
Map.addLayer(outline4, {palette: ['black']},'AOI', true);

// ingest land use and land cover dataset; pre-uploaded to Earth Engine 
var RCMRD2000 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/RCMRD/ESA_2000"),
    RCMRD2001 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/RCMRD/ESA_2001"),
    RCMRD2002 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/RCMRD/ESA_2002"),
    RCMRD2003 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/RCMRD/ESA_2003"),
    RCMRD2004 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/RCMRD/ESA_2004"),
    RCMRD2005 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/RCMRD/ESA_2005"),
    RCMRD2006 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/RCMRD/ESA_2006"),
    RCMRD2007 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/RCMRD/ESA_2007"),
    RCMRD2008 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/RCMRD/ESA_2008"),
    RCMRD2009 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/RCMRD/ESA_2009"),
    RCMRD2010 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/RCMRD/ESA_2010"),
    RCMRD2011 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/RCMRD/ESA_2011"),
    RCMRD2014 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/RCMRD/ESA_2014"),
    RCMRD2015 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/RCMRD/ESA_2015"),
    RCMRD2016 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/RCMRD/ESA_2016"),
    RCMRD2017 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/RCMRD/ESA_2017");
// classification scheme
var RCMRDpal = {
  min: 0,
  max: 6,
  palette:['ffffff', '54a708', 'ffff00', 'ffa6c9', '69fff8','ff0000', 'd2b48c']};
// ffffff - white - no data
// ffff00 - yellow - grassland
// ff0000 - red - settlement
// ffa6c9 - pink - cropland
// 54a708 - green - forest
// 69fff8 - blue - wetland
// d2b48c - tan - other land
Map.addLayer(RCMRD2017, RCMRDpal);

// reclassify to forest(1)/nonforest(0);
var Reclass00 = RCMRD2000.remap([0, 1, 2, 3, 4, 5, 6], [0, 1, 0, 0, 0, 0, 0]);
var Reclass17 = RCMRD2017.remap([0, 1, 2, 3, 4, 5, 6], [0, 1, 0, 0, 0, 0, 0]);
var Forest00 = Reclass00.eq(1); 
var Forest17 = Reclass17.eq(1); 
var MaskedFC00 = RCMRD2000.updateMask(Forest00);
var MaskedFC17 = RCMRD2017.updateMask(Forest17);

// Generate forest cover change layer between the two years by subtracting the second year from the prior year. 
var forestloss = Forest00.subtract(Forest17);
var FL = forestloss.eq(1);
var MaskedFL = forestloss.updateMask(FL);
Map.addLayer(MaskedFL.clip(roi), {palette:['red']}, 'Forest Loss', true);

// Use a histogram to resample and estimate quanity of each change type; print to console
var RCMRD_ChangeChart = ui.Chart.image.histogram({image: FL.clip(roi),region: roi,scale: 100, maxPixels: 3000000000}).setSeriesNames(['Area (ha.)']).setOptions({title: 'RCMRD Forest Loss, xx-yy',hAxis: {title: 'Binary Classification'},vAxis: {title: 'Area (hectares)'}}); 
print(RCMRD_ChangeChart);