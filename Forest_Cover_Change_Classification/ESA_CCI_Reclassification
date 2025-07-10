// The following Google Earth Engine Scripts ingests the annual ESA CCI 300m product provided by the the European Space Agency Climate Change Initative (https://www.esa-landcover-cci.org/#:~:text=We%20are%20pleased%20to%20announce%20the%20release%20of,22%20classes%20at%20a%20spatial%20resolution%20of%200.002778%C2%B0.)
// The orininally download can be done here: http://maps.elie.ucl.ac.be/CCI/viewer/download.php
// ESA. Land Cover CCI Product User Guide Version 2. Tech. Rep. (2017). Available at: maps.elie.ucl.ac.be/CCI/viewer/download/ESACCI-LC-Ph2-PUGv2_2.0.pdf

// Script Author: Christne Evans (cae0004@uah.edu) 
// Copied over: 06/25/2025

// 300m resolution
// National scale roi sourced from The United States Office of the Geographer provides the Large Scale International Boundary (LSIB) dataset (ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"))

// Define ROI & filter with name of country of interest
var roi = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017").filter(ee.Filter.inList('country_na', ['Zambia'])); 
var outline4 = ee.Image().byte().paint({featureCollection:roi,width:2});
Map.addLayer(outline4, {palette: ['black']},'AOI', true);

// Center console to match ROI
Map.centerObject(roi, 8);

// Layers have been pre-generated and uploaded to SERVIR's asset space as forest(1)/nonforest(0)
var CCI2000 = ee.Image('projects/ee-christineaevans/assets/S-CAP/CCI_LandCover/Pilot/LC_FNF_2000_15'),
CCI2001 = ee.Image('projects/ee-christineaevans/assets/S-CAP/CCI_LandCover/Pilot/LC_FNF_2001_15'),
CCI2002 = ee.Image('projects/ee-christineaevans/assets/S-CAP/CCI_LandCover/Pilot/LC_FNF_2002_15'),
CCI2003 = ee.Image('projects/ee-christineaevans/assets/S-CAP/CCI_LandCover/Pilot/LC_FNF_2003_15'),
CCI2004 = ee.Image('projects/ee-christineaevans/assets/S-CAP/CCI_LandCover/Pilot/LC_FNF_2004_15'),
CCI2005 = ee.Image('projects/ee-christineaevans/assets/S-CAP/CCI_LandCover/Pilot/LC_FNF_2005_15'),
CCI2006 = ee.Image('projects/ee-christineaevans/assets/S-CAP/CCI_LandCover/Pilot/LC_FNF_2006_15'),
CCI2007 = ee.Image('projects/ee-christineaevans/assets/S-CAP/CCI_LandCover/Pilot/LC_FNF_2007_15'),
CCI2008 = ee.Image('projects/ee-christineaevans/assets/S-CAP/CCI_LandCover/Pilot/LC_FNF_2008_15'),
CCI2009 = ee.Image('projects/ee-christineaevans/assets/S-CAP/CCI_LandCover/Pilot/LC_FNF_2009_15'),
CCI2010 = ee.Image('projects/ee-christineaevans/assets/S-CAP/CCI_LandCover/Pilot/LC_FNF_2010_15'),
CCI2011 = ee.Image('projects/ee-christineaevans/assets/S-CAP/CCI_LandCover/Pilot/LC_FNF_2011_15'),
CCI2012 = ee.Image('projects/ee-christineaevans/assets/S-CAP/CCI_LandCover/Pilot/LC_FNF_2012_15'),
CCI2013 = ee.Image('projects/ee-christineaevans/assets/S-CAP/CCI_LandCover/Pilot/LC_FNF_2013_15'),
CCI2014 = ee.Image('projects/ee-christineaevans/assets/S-CAP/CCI_LandCover/Pilot/LC_FNF_2014_15'),
CCI2015 = ee.Image('projects/ee-christineaevans/assets/S-CAP/CCI_LandCover/Pilot/LC_FNF_2015_15'),
CCI2016 = ee.Image('projects/ee-christineaevans/assets/S-CAP/CCI_LandCover/Pilot/LC_FNF_2016_15'),
CCI2017 = ee.Image('projects/ee-christineaevans/assets/S-CAP/CCI_LandCover/Pilot/LC_FNF_2017_15'),
CCI2018 = ee.Image('projects/ee-christineaevans/assets/S-CAP/CCI_LandCover/Pilot/LC_FNF_2018_15'),
CCI2019 = ee.Image('projects/ee-christineaevans/assets/S-CAP/CCI_LandCover/Pilot/LC_FNF_2019_15'),
CCI2020 = ee.Image('projects/ee-christineaevans/assets/S-CAP/CCI_LandCover/Pilot/LC_FNF_2020_15');
// Classification Scheme
// 10 Cropland, rainfed
// 11 Herbaceous cover
// 12 Tree or shrub cover
// 20 Cropland, irrigated or post‐flooding
// 30 Mosaic cropland (>50%) / natural vegetation (tree, shrub, herbaceous cover) (<50%)
// 40 Mosaic natural vegetation (tree, shrub, herbaceous cover) (>50%) / cropland (<50%)  
// 50 Tree cover, broadleaved, evergreen, closed to open (>15%)
// 60 Tree cover, broadleaved, deciduous, closed to open (>15%)
// 61 Tree cover, broadleaved, deciduous, closed (>40%)
// 62 Tree cover, broadleaved, deciduous, open (15‐40%)
// 70 Tree cover, needleleaved, evergreen, closed to open (>15%)
// 71 Tree cover, needleleaved, evergreen, closed (>40%)
// 72 Tree cover, needleleaved, evergreen, open (15‐40%)
// 80 Tree cover, needleleaved, deciduous, closed to open (>15%)
// 81 Tree cover, needleleaved, deciduous, closed (>40%)
// 82 Tree cover, needleleaved, deciduous, open (15‐40%)
// 90 Tree cover, mixed leaf type (broadleaved and needleleaved)
// 100 Mosaic tree and shrub (>50%) / herbaceous cover (<50%)
// 110 Mosaic herbaceous cover (>50%) / tree and shrub (<50%)
// 120 Shrubland
// 121 Evergreen shrubland
// 122 Deciduous shrubland
// 130 Grassland
// 140 Lichens and mosses
// 150 Sparse vegetation (tree, shrub, herbaceous cover) (<15%)
// 151 Sparse tree (<15%)
// 152 Sparse shrub (<15%)
// 153 Sparse herbaceous cover (<15%)
// 160 Tree cover, flooded, fresh or brakish water
// 170 Tree cover, flooded, saline water
// 180 Shrub or herbaceous cover, flooded, fresh/saline/brakish water
// 190 Urban areas
// 200 Bare areas
// 201 Consolidated bare areas
// 202 Unconsolidated bare areas
// 210 Water bodies
// 220 Permanent snow and ice

var Forest00 = CCI2000.eq(1);
var Forest20 = CCI2020.eq(1);
var imageVisParam = {"opacity":1,"bands":["b1"],"min":0,"max":1,"palette":["807f75","33583d"]};
Map.addLayer(Forest00.clip(roi), imageVisParam, 'Forest X', true);
Map.addLayer(Forest20.clip(roi), imageVisParam, 'Forest Y', true);

// Generate forest cover change layer between the two years by subtracting the second year from the prior year. 
var forestloss = Forest00.subtract(Forest20);
var FL = forestloss.eq(1); //we will use this to mask out nf and water
var MaskedFL = forestloss.updateMask(FL);
Map.addLayer(MaskedFL.clip(roi), {palette:['red']}, 'Forestloss', true);

// Use a histogram to resample and estimate quanity of each change type; print to console
var cci300m_chart = ui.Chart.image.histogram({image: FL.clip(roi),region: roi,scale: 100, maxPixels: 3000000000}).setSeriesNames(['Area (ha.)']).setOptions({title: 'ESA WorldCover 10m Forest Loss',hAxis: {title: 'Binary Classification'},vAxis: {title: 'Area (hectares)'}}); 
print(cci300m_chart);
