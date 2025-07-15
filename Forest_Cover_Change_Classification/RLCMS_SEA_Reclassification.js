/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var image = ee.Image("projects/servir-sco-assets/assets/SCO_MKG/EIA_Smokewatch/RLCMS_data/rlcms_2002"),
    image2 = ee.Image("projects/servir-sco-assets/assets/SCO_MKG/EIA_Smokewatch/RLCMS_data/rlcms_2003"),
    image3 = ee.Image("projects/servir-sco-assets/assets/SCO_MKG/EIA_Smokewatch/RLCMS_data/rlcms_2004"),
    image4 = ee.Image("projects/servir-sco-assets/assets/SCO_MKG/EIA_Smokewatch/RLCMS_data/rlcms_2005"),
    image5 = ee.Image("projects/servir-sco-assets/assets/SCO_MKG/EIA_Smokewatch/RLCMS_data/rlcms_2006"),
    image6 = ee.Image("projects/servir-sco-assets/assets/SCO_MKG/EIA_Smokewatch/RLCMS_data/rlcms_2007"),
    image7 = ee.Image("projects/servir-sco-assets/assets/SCO_MKG/EIA_Smokewatch/RLCMS_data/rlcms_2008"),
    image8 = ee.Image("projects/servir-sco-assets/assets/SCO_MKG/EIA_Smokewatch/RLCMS_data/rlcms_2009"),
    image9 = ee.Image("projects/servir-sco-assets/assets/SCO_MKG/EIA_Smokewatch/RLCMS_data/rlcms_2010"),
    image10 = ee.Image("projects/servir-sco-assets/assets/SCO_MKG/EIA_Smokewatch/RLCMS_data/rlcms_2011"),
    image11 = ee.Image("projects/servir-sco-assets/assets/SCO_MKG/EIA_Smokewatch/RLCMS_data/rlcms_2012"),
    image12 = ee.Image("projects/servir-sco-assets/assets/SCO_MKG/EIA_Smokewatch/RLCMS_data/rlcms_2013"),
    image13 = ee.Image("projects/servir-sco-assets/assets/SCO_MKG/EIA_Smokewatch/RLCMS_data/rlcms_2014"),
    image14 = ee.Image("projects/servir-sco-assets/assets/SCO_MKG/EIA_Smokewatch/RLCMS_data/rlcms_2015"),
    image15 = ee.Image("projects/servir-sco-assets/assets/SCO_MKG/EIA_Smokewatch/RLCMS_data/rlcms_2016"),
    image16 = ee.Image("projects/servir-sco-assets/assets/SCO_MKG/EIA_Smokewatch/RLCMS_data/rlcms_2017"),
    image17 = ee.Image("projects/servir-sco-assets/assets/SCO_MKG/EIA_Smokewatch/RLCMS_data/rlcms_2018"),
    image18 = ee.Image("projects/servir-sco-assets/assets/SCO_MKG/EIA_Smokewatch/RLCMS_data/rlcms_2019"),
    image19 = ee.Image("projects/servir-sco-assets/assets/SCO_MKG/EIA_Smokewatch/RLCMS_data/rlcms_2020"),
    image20 = ee.Image("projects/servir-sco-assets/assets/SCO_MKG/EIA_Smokewatch/RLCMS_data/rlcms_2021"),
    image21 = ee.Image("projects/servir-sco-assets/assets/SCO_MKG/EIA_Smokewatch/RLCMS_data/rlcms_2022"),
    image22 = ee.Image("projects/servir-sco-assets/assets/SCO_MKG/EIA_Smokewatch/RLCMS_data/rlcms_2023"),
    image23 = ee.Image("projects/servir-sco-assets/assets/SCO_MKG/EIA_Smokewatch/RLCMS_data/rlcms_2000"),
    image24 = ee.Image("projects/servir-sco-assets/assets/SCO_MKG/EIA_Smokewatch/RLCMS_data/rlcms_2001");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// The following Google Earth Engine Scripts ingests the Regional Land Cover Monitoring System land use land cover datasets; developed through SERVIR-SEA & ADPC
// The Regional Land Cover Monitoring System (RLCMS) for the Southeast Asia region is an operational service that provides 
// annual land cover mapping and change analysis services; For more information, please visit https://landcovermapping.org/en/

// Script Author: Christne Evans (cae0004@uah.edu) 
// Copied over: 06/30/2025

// date coverage: 2000 2023
// reclassification to forest (1)/nonforest (0);
// Land Cover Field Name	Field Value
// Aquaculture	1
// Barren	2
// Cropland	3
// Crop Plantation	4
// Deciduous Forest	5
// Evergreen Forest	6
// Flooded Forest	7
// Forest Plantation	8
// Grass	9
// Mangrove	10
// Other Forest	11
// Palm	12
// Rice	13
// Rubber	14
// Shrub	15
// Urban	16
// Water	17
// Wetland	18
// Snow	21
// user guide: https://docs.google.com/document/d/1zsmdsnKCAzcaYSSlQ-leea6OZ-ALzWf3mNdwNJrcP6k/edit?usp=sharing
// https://landcovermapping.org/en/landcover/
var RC_00 = image23.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21], [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
var RC_01 = image24.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21], [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
var RC_02 = image.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21], [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
var RC_03 = image2.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21], [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
var RC_04 = image3.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21], [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
var RC_05 = image4.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21], [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
var RC_06 = image5.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21], [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
var RC_07 = image6.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21], [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
var RC_08 = image7.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21], [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
var RC_09 = image8.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21], [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
var RC_10 = image9.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21], [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
var RC_11 = image10.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21], [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
var RC_12 = image11.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21], [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
var RC_13 = image12.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21], [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
var RC_14 = image13.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21], [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
var RC_15 = image14.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21], [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
var RC_16 = image15.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21], [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
var RC_17 = image16.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21], [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
var RC_18 = image17.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21], [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
var RC_19 = image18.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21], [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
var RC_20 = image19.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21], [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
var RC_21 = image20.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21], [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
var RC_22 = image21.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21], [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
var RC_23 = image22.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21], [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);

// National scale roi sourced from The United States Office of the Geographer provides the Large Scale International Boundary (LSIB) dataset (ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"))
// Define ROI & filter with name of country of interest
var roi = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017").filter(ee.Filter.inList('country_na', ['Thailand'])); 
var outline4 = ee.Image().byte().paint({featureCollection:roi,width:2});
Map.addLayer(outline4, {palette: ['black']},'AOI', true);

// Center console to match ROI
Map.centerObject(roi, 8);

var yearX = RC_00;
var yearY = RC_19;
var Subtraction = yearX.subtract(yearY);
var Loss = Subtraction.eq(1); 
var RLCMS_Loss = Subtraction.updateMask(Loss);
Map.addLayer(RLCMS_Loss.clip(roi), {palette:['red']}, 'RLCMS - Forest Loss', true);
var RLCMS_Chart = ui.Chart.image.histogram({image: RLCMS_Loss.unmask().clip(roi),region: roi,scale: 100, maxPixels: 304216963968}).setSeriesNames(['Area (ha.)']).setOptions({title: 'RLCMS Forest Loss',hAxis: {title: 'Binary Classification'},vAxis: {title: 'Area (hectares)'}}); 
print(RLCMS_Chart);
