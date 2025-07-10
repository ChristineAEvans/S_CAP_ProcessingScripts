/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var GEDI2020 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/agb_ref/tropics_agb_2020_gedi_l4b_v2_1_2020_1km"),
    XU20 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/agb_ref/global_agb_2019_xu_1km_nn"),
    CCI = ee.ImageCollection("projects/sat-io/open-datasets/ESA/ESA_CCI_AGB");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var AOI = ee.FeatureCollection("projects/servir-sco-assets/assets/SCO_WA/roi_ghana");
// Original mining data from CERSGIS (2015-2024)
var footprints = ee.ImageCollection("projects/ee-cersgisrsteams/assets/MINING_FOOTPRINT/Footprint_Collection");
print(footprints);

// Pull out individual year layers - combine active and abandoned class into one mining class, ignore polluted river class
var mining_2015 = ee.ImageCollection(footprints.filter(ee.Filter.eq("Year",2015)).mosaic().select('b1').lte(2).selfMask());
var mining_2016 = ee.ImageCollection(footprints.filter(ee.Filter.eq("Year",2016)).mosaic().select('b1').lte(2).selfMask());
var mining_2017 = ee.ImageCollection(footprints.filter(ee.Filter.eq("Year",2017)).mosaic().select('b1').lte(2).selfMask());
var mining_2018 = ee.ImageCollection(footprints.filter(ee.Filter.eq("Year",2018)).mosaic().select('b1').lte(2).selfMask());
var mining_2019 = ee.ImageCollection(footprints.filter(ee.Filter.eq("Year",2019)).mosaic().select('b1').lte(2).selfMask());
var mining_2020 = ee.ImageCollection(footprints.filter(ee.Filter.eq("Year",2020)).mosaic().select('b1').lte(2).selfMask());
var mining_2021 = ee.ImageCollection(footprints.filter(ee.Filter.eq("Year",2021)).mosaic().select('b1').lte(2).selfMask());
var mining_2022 = ee.ImageCollection(footprints.filter(ee.Filter.eq("Year",2022)).mosaic().select('b1').lte(2).selfMask());
var mining_2023 = ee.ImageCollection(footprints.filter(ee.Filter.eq("Year",2023)).mosaic().select('b1').lte(2).selfMask());
var mining_2024 = ee.ImageCollection(footprints.filter(ee.Filter.eq("Year",2024)).mosaic().select('b1').lte(2).selfMask());

// Baseline year is 2015 - do not know previous state so cannot determine "new" 2015 mining
// Layer represents all mining that existed in 2015 regardless of when it began
Map.addLayer(mining_2015,{palette:'ffffe5'},"'Original' Mining Layer - 2015",false);

// Total Mining in 2016 is maximum extent (merge) of 2016 and previous years (only 2015)
var total_mining_2016 = mining_2016.merge(mining_2015);
// The new mining in 2016 is where "count" is 1 or less, since the mining does not appear in previous years (2015)
var new_mining_2016 = mining_2015.merge(total_mining_2016).count().lte(1).selfMask();
Map.addLayer(new_mining_2016,{palette:'fff7bc'},"New Mining 2016",false);

// Total Mining in 2017 is maximum extent (merge) of 2017 and previous years (2015+2016)
var total_mining_2017 = mining_2017.merge(total_mining_2016);
// The new mining in 2017 is where "count" is 1 or less, since the mining does not appear in previous years (2015+2016)
var new_mining_2017 = total_mining_2016.merge(total_mining_2017).count().lte(1).selfMask();
Map.addLayer(new_mining_2017,{palette:'fee391'},"New Mining 2017",false);

// Total Mining in 2018 is maximum extent (merge) of 2018 and previous years (2015+2016+2017)
var total_mining_2018 = mining_2018.merge(total_mining_2017);
// The new mining in 2018 is where "count" is 1 or less, since the mining does not appear in previous years (2015+2016+2017)
var new_mining_2018 = total_mining_2017.merge(total_mining_2018).count().lte(1).selfMask();
Map.addLayer(new_mining_2018,{palette:'fec44f'},"New Mining 2018",false);

// Total Mining in 2019 is maximum extent (merge) of 2019 and previous years (2015+2016+2017+2018)
var total_mining_2019 = mining_2019.merge(total_mining_2018);
// The new mining in 2019 is where "count" is 1 or less, since the mining does not appear in previous years (2015+2016+2017+2018)
var new_mining_2019 = total_mining_2018.merge(total_mining_2019).count().lte(1).selfMask();
Map.addLayer(new_mining_2019,{palette:'fe9929'},"New Mining 2019",false);

// Total Mining in 2020 is maximum extent (merge) of 2020 and previous years (2015+2016+2017+2018+2019)
var total_mining_2020 = mining_2020.merge(total_mining_2019);
// The new mining in 2020 is where "count" is 1 or less, since the mining does not appear in previous years (2015+2016+2017+2018+2019)
var new_mining_2020 = total_mining_2019.merge(total_mining_2020).count().lte(1).selfMask();
Map.addLayer(new_mining_2020,{palette:'ec7014'},"New Mining 2020",false);

// Total Mining in 2021 is maximum extent (merge) of 2021 and previous years (2015+2016+2017+2018+2019+2020)
var total_mining_2021 = mining_2021.merge(total_mining_2020);
// The new mining in 2021 is where "count" is 1 or less, since the mining does not appear in previous years (2015+2016+2017+2018+2019+2020)
var new_mining_2021 = total_mining_2020.merge(total_mining_2021).count().lte(1).selfMask();
Map.addLayer(new_mining_2021,{palette:'cc4c02'},"New Mining 2021",false);

// Total Mining in 2022 is maximum extent (merge) of 2022 and previous years (2015+2016+2017+2018+2019+2020+2021)
var total_mining_2022 = mining_2022.merge(total_mining_2021);
// The new mining in 2022 is where "count" is 1 or less, since the mining does not appear in previous years (2015+2016+2017+2018+2019+2020+2021)
var new_mining_2022 = total_mining_2021.merge(total_mining_2022).count().lte(1).selfMask();
Map.addLayer(new_mining_2022,{palette:'993404'},"New Mining 2022",false);

// Total Mining in 2023 is maximum extent (merge) of 2023 and previous years (2015+2016+2017+2018+2019+2020+2021+2022)
var total_mining_2023 = mining_2023.merge(total_mining_2022);
// The new mining in 2023 is where "count" is 1 or less, since the mining does not appear in previous years (2015+2016+2017+2018+2019+2020+2021+2022)
var new_mining_2023 = total_mining_2022.merge(total_mining_2023).count().lte(1).selfMask();
Map.addLayer(new_mining_2023,{palette:'662506'},"New Mining 2023",false);

// Total Mining in 2024 is maximum extent (merge) of 2024 and previous years (2015+2016+2017+2018+2019+2020+2021+2022+2023)
var total_mining_2024 = mining_2024.merge(total_mining_2023);
// The new mining in 2024 is where "count" is 1 or less, since the mining does not appear in previous years (2015+2016+2017+2018+2019+2020+2021+2022+2023)
var new_mining_2024 = total_mining_2023.merge(total_mining_2024).count().lte(1).selfMask();
Map.addLayer(new_mining_2024,{palette:'black'},"New Mining 2024",false);

var post_2015_mining = ee.ImageCollection([new_mining_2016,new_mining_2017,new_mining_2018,new_mining_2019,new_mining_2020,new_mining_2021,
  new_mining_2022,new_mining_2023,new_mining_2024]).mosaic();
  
Map.addLayer(total_mining_2024,{palette:'cyan'},"Total Mined area thru 2024",false);
// total_mining_2024 needs .mean() new_mining_20xx and post_2015_mining does not 
var Expansion_chart = ui.Chart.image.histogram({image: post_2015_mining.unmask(),
                                          region: AOI,
                                          scale: 100,
                                          // maxBuckets: 100,
                                          // minBucketWidth: 50,
                                          // maxRaw: 500,
                                          maxPixels: 3000000000})
                                          .setSeriesNames(['Area (ha.)'])
                                          .setOptions({title: 'Mining Expansion', 
                                          hAxis: {title: 'Binary Classification'}, 
                                          vAxis: {title: 'Area (hectares)'}}); 

print(Expansion_chart);
// Map.addLayer(mining_2019,{palette:'purple'},"Original Mining Layer - 2019",false);
// Map.addLayer(mining_2016,{palette:'red'},"Original Mining Layer - 2016",false);
// Map.addLayer(mining_2015,{palette:'green'},"Original Mining Layer - 2015",false);
// Map.addLayer(total_mining_2016,{},"Total Mining 2016 (2015+2016)",false);
// Map.addLayer(mining_2015,{palette:'green'},"Original Mining Layer - 2015",false);
// Map.addLayer(total_mining_2017,{palette:'orange'},"Total Mining 2017 (2017+2016)",false);

// Add emissions component
// Calculate emissions due to mining expansion // total_mining_2024 needs .mean() new_mining_20xx does not
var AGB_gedi = GEDI2020.updateMask(post_2015_mining);
var CCI20 = CCI.filterDate('2019-01-01','2021-01-01').first().select(['AGB']);
var AGB_cci = CCI20.updateMask(post_2015_mining);
var AGB_xu = XU20.updateMask(post_2015_mining);
//Map.addLayer(AGBy,{min: 10, max: 250, palette: '440154,414387,2a788e,23a884,7ad151,fde725'},'Mean Biomass - Full mining');

// Average to get Total Carbon Emissions for the region's forest cover
var MiningGEDI_AGB = ee.Number(AGB_gedi.reduceRegion({reducer: ee.Reducer.mean(), geometry: AOI ,maxPixels: 1e9}).get('b1'));
print(MiningGEDI_AGB, 'GEDI - mining expansion AGB');
var gediAGB_tot = ee.Number(AGB_gedi.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
  geometry: AOI, reducer: ee.Reducer.sum(), maxPixels: 23182240}).get('b1'));
print(gediAGB_tot, 'total tons of AGB - GEDI');
var gediCO2_tot = gediAGB_tot.multiply(0.48).multiply(44).divide(12);
print(gediCO2_tot, 'total tons of CO2 -GEDI');
var MiningGEDI_CO2 = MiningGEDI_AGB.multiply(0.48).multiply(44).divide(12);
print(MiningGEDI_CO2, 'GEDI - mining expansion CO2');


var MiningCCI_AGB = ee.Number(AGB_cci.reduceRegion({reducer: ee.Reducer.mean(), geometry: AOI ,maxPixels: 1e9}).get('AGB'));
print(MiningCCI_AGB, 'CCI - mining expansion AGB');
var cciAGB_tot = ee.Number(AGB_cci.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
  geometry: AOI, reducer: ee.Reducer.sum(), maxPixels: 23182240}).get('AGB'));
print(cciAGB_tot, 'total tons of AGB - CCI');
var cciCO2_tot = cciAGB_tot.multiply(0.48).multiply(44).divide(12);
print(cciCO2_tot, 'total tons of CO2 - CCI');
var MiningCCI_CO2 = MiningCCI_AGB.multiply(0.48).multiply(44).divide(12);
print(MiningCCI_CO2, 'CCI - mining expansion CO2');

var MiningXu_AGB = ee.Number(AGB_xu.reduceRegion({reducer: ee.Reducer.mean(), geometry: AOI ,maxPixels: 1e9}).get('b1'));
print(MiningXu_AGB, 'XU - mining expansion AGB');
var xuAGB_tot = ee.Number(AGB_xu.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
  geometry: AOI, reducer: ee.Reducer.sum(), maxPixels: 23182240}).get('b1'));
print(xuAGB_tot, 'total tons of AGB - XU');
var xuCO2_tot = xuAGB_tot.multiply(0.48).multiply(44).divide(12);
print(xuCO2_tot, 'total tons of CO2 - XU');
var MiningXu_CO2 = MiningXu_AGB.multiply(0.48).multiply(44).divide(12);
print(MiningXu_CO2, 'XU - mining expansion CO2');

// pre mining v "post" mining
var XU10 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/agb_ref/global_agb_2010_xu_1km_nn").updateMask(total_mining_2024.mean());
var XU00 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/agb_ref/global_agb_2000_xu__reup").updateMask(total_mining_2024.mean());
var AGB_xu = XU20.updateMask(post_2015_mining);
var CCI10 = CCI.filterDate('2009-01-01','2011-01-01').first().select(['AGB']);
var CCI20 = CCI.filterDate('2019-01-01','2021-01-01').first().select(['AGB']);
var AGB_cci10 = CCI10.updateMask(post_2015_mining);
var AGB_cci20 = CCI20.updateMask(post_2015_mining);
var MiningCCI_AGB10 = ee.Number(AGB_cci10.reduceRegion({reducer: ee.Reducer.mean(), geometry: AOI ,maxPixels: 1e9}).get('AGB'));
print(MiningCCI_AGB10, 'CCI - mining expansion AGB -2010');
var MiningCCI_AGB20 = ee.Number(AGB_cci20.reduceRegion({reducer: ee.Reducer.mean(), geometry: AOI ,maxPixels: 1e9}).get('AGB'));
print(MiningCCI_AGB20, 'CCI - mining expansion AGB -2020');
var MiningXu_AGB00 = ee.Number(XU00.reduceRegion({reducer: ee.Reducer.mean(), geometry: AOI ,maxPixels: 1e9}).get('b1'));
print(MiningXu_AGB00, 'XU - mining expansion AGB-2000');
var MiningXu_AGB10 = ee.Number(XU10.reduceRegion({reducer: ee.Reducer.mean(), geometry: AOI ,maxPixels: 1e9}).get('b1'));
print(MiningXu_AGB10, 'XU - mining expansion AGB-2010');
var MiningXu_AGB20 = ee.Number(AGB_xu.reduceRegion({reducer: ee.Reducer.mean(), geometry: AOI ,maxPixels: 1e9}).get('b1'));
print(MiningXu_AGB20, 'XU - mining expansion AGB-2020');

