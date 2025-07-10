/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var NLCMS00 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/NLCMS/lc2000"),
    NLCMS01 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/NLCMS/lc2001"),
    NLCMS02 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/NLCMS/lc2002"),
    NLCMS03 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/NLCMS/lc2003"),
    NLCMS04 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/NLCMS/lc2004"),
    NLCMS05 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/NLCMS/lc2005"),
    NLCMS06 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/NLCMS/lc2006"),
    NLCMS07 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/NLCMS/lc2007"),
    NLCMS08 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/NLCMS/lc2008"),
    NLCMS09 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/NLCMS/lc2009"),
    NLCMS10 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/NLCMS/lc2010"),
    NLCMS11 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/NLCMS/lc2011"),
    NLCMS13 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/NLCMS/lc2013"),
    NLCMS14 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/NLCMS/lc2014"),
    NLCMS15 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/NLCMS/lc2015"),
    NLCMS16 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/NLCMS/lc2016"),
    NLCMS17 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/NLCMS/lc2017"),
    NLCMS18 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/NLCMS/lc2018"),
    NLCMS19 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/regionalLC/NLCMS/lc2019");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// The following Google Earth Engine Scripts ingests the National Land Cover Monitoring System land use land cover datasets; developed through SERVIR-HKH & ICIMOD
// The Regional Land Cover Monitoring System (NLCMS) for Nepal is an operational service that provides 
// annual land cover mapping and change analysis services; For more information, please visit https://servir.icimod.org/science-applications/national-land-cover-monitoring-system-nepal/

// Script Author: Christne Evans (cae0004@uah.edu) 
// Copied over: 06/30/2025


// date coverage: 2000-2019
// reclassification to forest (1)/nonforest (0); // 4: forest
// user guide: https://geoapps.icimod.org/RLCMS/static/main/downloads/user_guide_rlcms.pdf
var NLCMSreclass00 = NLCMS00.remap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]);
var NLCMSreclass01 = NLCMS01.remap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]);
var NLCMSreclass02 = NLCMS02.remap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]);
var NLCMSreclass03 = NLCMS03.remap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]);
var NLCMSreclass04 = NLCMS04.remap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]);
var NLCMSreclass05 = NLCMS05.remap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]);
var NLCMSreclass06 = NLCMS06.remap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]);
var NLCMSreclass07 = NLCMS07.remap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]);
var NLCMSreclass08 = NLCMS08.remap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]);
var NLCMSreclass09 = NLCMS09.remap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]);
var NLCMSreclass10 = NLCMS10.remap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]);
var NLCMSreclass11 = NLCMS11.remap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]);
var NLCMSreclass13 = NLCMS13.remap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]);
var NLCMSreclass14 = NLCMS14.remap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]);
var NLCMSreclass15 = NLCMS15.remap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]);
var NLCMSreclass16 = NLCMS16.remap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]);
var NLCMSreclass17 = NLCMS17.remap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]);
var NLCMSreclass18 = NLCMS18.remap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]);
var NLCMSreclass19 = NLCMS19.remap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]);

Map.addLayer(NLCMSreclass19)
// reclassification to forest (1)/nonforest (0); // 4: forest
// user guide: http://rds.icimod.org/Home/DataDetail?metadataId=1972729


// National scale roi sourced from The United States Office of the Geographer provides the Large Scale International Boundary (LSIB) dataset (ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"))
// Define ROI & filter with name of country of interest
var roi = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017").filter(ee.Filter.inList('country_na', ['Nepal'])); 
var outline4 = ee.Image().byte().paint({featureCollection:roi,width:2});
Map.addLayer(outline4, {palette: ['black']},'AOI', true);

// Center console to match ROI
Map.centerObject(roi, 8);

var yearX = NLCMSreclass00;
var yearY = NLCMSreclass19;
var Subtraction = yearX.subtract(yearY);
var Loss = Subtraction.eq(1); 
var NLCMS_Loss = Subtraction.updateMask(Loss);
Map.addLayer(NLCMS_Loss.clip(roi), {palette:['red']}, 'RLCMS - Forest Loss', true);
var NLCMS_Chart = ui.Chart.image.histogram({image: NLCMS_Loss.unmask().clip(roi),region: roi,scale: 100, maxPixels: 3000000000}).setSeriesNames(['Area (ha.)']).setOptions({title: 'NLCMS Forest Loss',hAxis: {title: 'Binary Classification'},vAxis: {title: 'Area (hectares)'}}); 
print(NLCMS_Chart);