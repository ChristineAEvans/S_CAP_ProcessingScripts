/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var aoi = ee.FeatureCollection("projects/servir-sco-assets/assets/SCO_AMZ/RAMI/rami_box"),
    Mining22 = ee.FeatureCollection("projects/servir-sco-assets/assets/SCO_AMZ/RAMI2/Composite22P"),
    Mining23 = ee.FeatureCollection("projects/servir-sco-assets/assets/SCO_AMZ/RAMI2/Composite23P"),
    Mining24 = ee.FeatureCollection("projects/servir-sco-assets/assets/SCO_AMZ/RAMI2/Composite24P"),
    agb_xu = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/agb_ref/global_agb_2019_xu_1km_nn"),
    agb_gedi = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/agb_ref/tropics_agb_2020_gedi_l4b_v2_1_2020_1km"),
    XU10 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/agb_ref/global_agb_2010_xu_1km_nn"),
    XU00 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/agb_ref/global_agb_2000_xu__reup"),
    MB2020 = ee.Image("projects/servir-sco-assets/assets/SCO_AMZ/RAMI2/Peru_MapBiomas2020"),
    MB2021 = ee.Image("projects/servir-sco-assets/assets/SCO_AMZ/RAMI2/Peru_MapBiomas2021"),
    MB2022 = ee.Image("projects/servir-sco-assets/assets/SCO_AMZ/RAMI2/Peru_MapBiomas2022"),
    MB2023 = ee.Image("projects/servir-sco-assets/assets/SCO_AMZ/RAMI2/Peru_MapBiomas2023"),
    MB2024 = ee.Image("projects/servir-sco-assets/assets/SCO_AMZ/RAMI2/Peru_MapBiomas2024"),
    MadreDeDios = ee.FeatureCollection("projects/servir-sco-assets/assets/SCO_AMZ/RAMI/MadreDeDios"),
    CCI = ee.ImageCollection("projects/sat-io/open-datasets/ESA/ESA_CCI_AGB");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// forest mask
// 1. Formación boscosa 1 #1f8d49
//     1.1. Bosque 3 #1f8d49 Natural
//     1.2. Bosque seco 4 #7dc975 Natural
//     1.3. Manglar 5 #04381d Natural
//     1.4. Bosque inundable 6 #026975 Natural
// 2. Formación natural no boscosa 10 #d6bc74
//     2.1. Zona pantanosa o pastizal inundable 11 #519799 Natural
//     2.2. Pastizal / herbazal 12 #d6bc74 Natural
//     2.3. Afloramiento rocoso 29 #ffaa5f Natural
//     2.4. Matorral 66 #a89358 Natural
//     2.5. Loma costera 70 #be9e00 Natural
//     2.6. Otra formacion no boscosa 13 #d89f5c Natural
// 3. Área agropecuaria 14 #ffefc3
//     3.1. Pasto 15 #edde8e Antrópico
//     3.2. Agricultura 18 #e974ed Antrópico
//       3.2.1. Palma aceitera 35 #9065d0 Antrópico
//       3.2.2. Arroz 40 #c71585 Antrópico
//       3.2.3. Otros cultivos 72 #910046 Antrópico
//     3.3. Plantación forestal 9 #7a5900 Antrópico
//     3.4. Mosaico agropecuario 21 #ffefc3 Antrópico
// 4. Área sin vegetación 22 #d4271e
//     4.1. Playa 23 #ffa07a Natural
//     4.2. Infraestructura urbana 24 #d4271e Antrópico
//     4.3. Minería 30 #9c0027 Antrópico
//     4.4. Salina costera 32 #fc8114 Natural
//     4.5. Salar 61 #f5d5d5 Natural
//     4.6. Otra área natural sin vegetación 68 #E97A7A Natural
//     4.7. Otra área sin vegetación  25 #db4d4f Antrópico
// 5. Cuerpo de agua 26 #2532e4
//     5.1. Río, lago u océano 33 #2532e4 Natural
//     5.2. Acuicultura 31 #091077 Antrópico
//     5.3. Glaciar 34 #93dfe6 Natural
// 6. No observado 27 #ffffff No definido

var RC_21 = MB2021.remap([0,1,3,4,5,6,9,10,11,12,13,14,15,18,21,22,23,24,25,26,27,29,30,31,32,33,34,35,40,61,66,68,70,72], [0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
var RC_22 = MB2022.remap([0,1,3,4,5,6,9,10,11,12,13,14,15,18,21,22,23,24,25,26,27,29,30,31,32,33,34,35,40,61,66,68,70,72], [0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
var RC_23 = MB2023.remap([0,1,3,4,5,6,9,10,11,12,13,14,15,18,21,22,23,24,25,26,27,29,30,31,32,33,34,35,40,61,66,68,70,72], [0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
var RC_24 = MB2024.remap([0,1,3,4,5,6,9,10,11,12,13,14,15,18,21,22,23,24,25,26,27,29,30,31,32,33,34,35,40,61,66,68,70,72], [0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
var Forest21 = RC_23.eq(1).clip(MadreDeDios);
var Forest22 = RC_24.eq(1).clip(MadreDeDios); 
var Forest23 = RC_23.eq(1).clip(MadreDeDios);
var Forest24 = RC_24.eq(1).clip(MadreDeDios); 
// mining extents
var rasterMining2022 = ee.Image.constant(1).clip(Mining22);
var rasterMining2023 = ee.Image.constant(1).clip(Mining23);
var rasterMining2024 = ee.Image.constant(1).clip(Mining24);
var RAMImining = ee.ImageCollection([rasterMining2022, rasterMining2023, rasterMining2024]);
Map.addLayer(rasterMining2022, {min: 1, max: 1, palette: 'cdb33b'},'2022');
Map.addLayer(rasterMining2023, {min: 1, max: 1, palette: '33280d'},'2023');
Map.addLayer(rasterMining2024, {min: 1, max: 1, palette: '6f6f6f'},'2024');

// quantify annual mining extent // update image to year of interest
var Alert_chart = ui.Chart.image.histogram({image: rasterMining2024.unmask().clip(aoi),
                                          region: aoi,
                                          scale: 100,
                                          // maxBuckets: 100,
                                          // minBucketWidth: 50,
                                          // maxRaw: 500,
                                          maxPixels: 3000000000})
                                          .setSeriesNames(['Area (ha.)'])
                                          .setOptions({title: 'Mining Expansion', 
                                          hAxis: {title: 'Binary Classification'}, 
                                          vAxis: {title: 'Area (hectares)'}}); 

print(Alert_chart);
Map.centerObject(aoi, 8);
// S-CAP: Estimate forest carbon stocks
// Mining Extent carbon stock - RAMI
// entire AOI
var footprintForestx = Forest21.clip(aoi);
var AGBx = XU00.updateMask(footprintForestx);
//Map.addLayer(AGBy,{min: 10, max: 250, palette: '440154,414387,2a788e,23a884,7ad151,fde725'},'Mean Biomass - Full mining');

// Average to get Total Carbon Emissions for the region's forest cover
var AOIfc_AGB = AGBx.reduceRegion({reducer: ee.Reducer.mean(), geometry: aoi ,maxPixels: 1e9});
print(AOIfc_AGB, 'Full AOI AGB');

// Mining extent only
var footprintALL = RAMImining.mosaic();
var footprintForest = Forest21.updateMask(footprintALL);
var CCI20 = CCI.filterDate('2019-01-01','2021-01-01').first().select(['AGB']);
var CCI10 = CCI.filterDate('2009-01-01','2011-01-01').first().select(['AGB']);

var AGBy = CCI20.updateMask(footprintForest);
//Map.addLayer(AGBy,{min: 10, max: 250, palette: '440154,414387,2a788e,23a884,7ad151,fde725'},'Mean Biomass - Full mining');

// Average to get Total Carbon Emissions for the region's forest cover
var Miningfc_AGB = AGBy.reduceRegion({reducer: ee.Reducer.mean(), geometry: aoi ,maxPixels: 1e9});
print(Miningfc_AGB, 'Mining AOI AGB');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// emissions by year
// Load boundary datasets
var mining = Mining24; // swap out
var rasterMining = rasterMining2024; // swap out
// load AGB dataset
var AGB = CCI20; // swap out

// Extracting biomass statistics from AGB datasets
var ActivityData = rasterMining.clip(mining);
Map.addLayer(ActivityData, {palette:['red']}, 'mining', true);

var AGB_mask = AGB.mask(ActivityData);
var AGB_masked = AGB.updateMask(AGB_mask);


// extracting biomass statistics from AGB datasets
var Activity_AGB = ee.Number(AGB_masked.reduceRegion({reducer: ee.Reducer.mean(), geometry: mining,maxPixels: 1e9}).get('AGB')); 


var AGB_tot = ee.Number(AGB.clip(mining).multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
  geometry: mining.geometry(), reducer: ee.Reducer.sum(), maxPixels: 23182240}).get('AGB')); // cci .get('AGB')

var CO2_tot = AGB_tot.multiply(0.48).multiply(44).divide(12);

var CO2_ha = Activity_AGB.multiply(0.48).multiply(44).divide(12);

print(Activity_AGB, 'Mean tons of AGB / ha.');
print(AGB_tot, 'total tons of AGB');
print(CO2_tot, 'total tons of CO2');
print(CO2_ha, 'Mean C02/ha');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// pre mining v "post" mining
// var XU10 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/agb_ref/global_agb_2010_xu_1km_nn").updateMask(footprintALL);
// var XU00 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/agb_ref/global_agb_2000_xu__reup").updateMask(footprintALL);
// var XU20 = agb_xu.updateMask(footprintALL);
// var CCI10 = CCI.filterDate('2009-01-01','2011-01-01').first().select(['AGB']);
// var CCI20 = CCI.filterDate('2019-01-01','2021-01-01').first().select(['AGB']);
// var AGB_cci10 = CCI10.updateMask(footprintALL);
// var AGB_cci20 = CCI20.updateMask(footprintALL);
// var MiningCCI_AGB10 = ee.Number(AGB_cci10.reduceRegion({reducer: ee.Reducer.mean(), geometry: aoi ,maxPixels: 1e9}).get('AGB'));
// print(MiningCCI_AGB10, 'CCI - mining expansion AGB -2010');
// var MiningCCI_AGB20 = ee.Number(AGB_cci20.reduceRegion({reducer: ee.Reducer.mean(), geometry: aoi ,maxPixels: 1e9}).get('AGB'));
// print(MiningCCI_AGB20, 'CCI - mining expansion AGB -2020');
// var MiningXu_AGB00 = ee.Number(XU00.reduceRegion({reducer: ee.Reducer.mean(), geometry: aoi ,maxPixels: 1e9}).get('b1'));
// print(MiningXu_AGB00, 'XU - mining expansion AGB-2000');
// var MiningXu_AGB10 = ee.Number(XU10.reduceRegion({reducer: ee.Reducer.mean(), geometry: aoi ,maxPixels: 1e9}).get('b1'));
// print(MiningXu_AGB10, 'XU - mining expansion AGB-2010');
// var MiningXu_AGB20 = ee.Number(XU20.reduceRegion({reducer: ee.Reducer.mean(), geometry: aoi ,maxPixels: 1e9}).get('b1'));
// print(MiningXu_AGB20, 'XU - mining expansion AGB-2020');

