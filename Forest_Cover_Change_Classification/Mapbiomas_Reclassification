// The following Google Earth Engine Scripts ingests the annual MapBiomas land cover and land use maps which were downloaded through their GEE toolkit: MapBiomas User Toolkit 1.34.0 --> code and tutorial --> https://github.com/mapbiomas-brazil/user-toolkit
// The orininally classification values, color codes, and description can be found at https://amazonia.mapbiomas.org/codigos-de-la-leyenda/
// MapBiomas Amazonía Project – Collection [version] of annual land cover and land use maps“
// “The MapBiomas Amazonía project is a multi-institutional initiative to generate annual land cover and land use maps. The complete description of the project can be found at http://amazonia.mapbiomas.org 

// Script Author: Christne Evans (cae0004@uah.edu) 
// Copied over: 06/25/2025

// This script provides details of their Amazon and Peru specific classifications for land cover and land use but the toolkit contains several versions you can download 
// Define ROI & filter with name of country of interest
var roi = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017").filter(ee.Filter.inList('country_na', ['Peru'])); 
var outline4 = ee.Image().byte().paint({featureCollection:roi,width:2});
Map.addLayer(outline4, {palette: ['black']},'AOI', true);

// Center console to match ROI
Map.centerObject(roi, 8);

// MapBiomas-Peru collection 3 annual land cover and use product
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

// layers shown here have been pre-exported from the toolkit
var MB2021 = ee.Image("projects/servir-sco-assets/assets/SCO_AMZ/RAMI2/Peru_MapBiomas2021"),
    MB2022 = ee.Image("projects/servir-sco-assets/assets/SCO_AMZ/RAMI2/Peru_MapBiomas2022"),
    MB2024 = ee.Image("projects/servir-sco-assets/assets/SCO_AMZ/RAMI2/Peru_MapBiomas2024"),
    MB2020 = ee.Image("projects/servir-sco-assets/assets/SCO_AMZ/RAMI2/Peru_MapBiomas2020"),
    MB2023 = ee.Image("projects/servir-sco-assets/assets/SCO_AMZ/RAMI2/Peru_MapBiomas2023");

// Using the legend listed above, we reclassified to forest(1)/nonforest(0)
var Peru_20_RC = MB2020.remap([0,1,3,4,5,6,9,10,11,12,13,14,15,18,21,22,23,24,25,26,27,29,30,31,32,33,34,35,40,61,66,68,70,72], [0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
var Peru_21_RC = MB2021.remap([0,1,3,4,5,6,9,10,11,12,13,14,15,18,21,22,23,24,25,26,27,29,30,31,32,33,34,35,40,61,66,68,70,72], [0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
var Peru_22_RC = MB2022.remap([0,1,3,4,5,6,9,10,11,12,13,14,15,18,21,22,23,24,25,26,27,29,30,31,32,33,34,35,40,61,66,68,70,72], [0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
var Peru_23_RC = MB2023.remap([0,1,3,4,5,6,9,10,11,12,13,14,15,18,21,22,23,24,25,26,27,29,30,31,32,33,34,35,40,61,66,68,70,72], [0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
var Peru_24_RC = MB2024.remap([0,1,3,4,5,6,9,10,11,12,13,14,15,18,21,22,23,24,25,26,27,29,30,31,32,33,34,35,40,61,66,68,70,72], [0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
var Forestx = Peru_23_RC.eq(1).clip(roi);
var Foresty = Peru_24_RC.eq(1).clip(roi); 
var MaskedFC_Perux = Peru_23_RC.updateMask(Forestx);
var MaskedFC_Peruy = Peru_24_RC.updateMask(Foresty);
// Generate forest cover change layer between the two years by subtracting the second year from the prior year. 
var forestloss = Forestx.subtract(Foresty);
Map.addLayer(forestloss.clip(roi), {}, 'forest dynamics peru')
var Peru_change_chart = ui.Chart.image.histogram({image: forestloss.clip(roi),
                                          region: roi,
                                          scale: 100,
                                          // maxBuckets: 100,
                                          // minBucketWidth: 50,
                                          // maxRaw: 500,
                                          maxPixels: 3000000000})
                                          .setSeriesNames(['Area (ha.)'])
                                          .setOptions({title: 'forest area change - MapBiomas-Peru collection 3', 
                                          hAxis: {title: 'Binary Classification'}, 
                                          vAxis: {title: 'Area (hectares)'}}); 

print(Peru_change_chart);

// MapBiomas-Amazon collection 6 annual land cover and use product
// https://amazonia.mapbiomas.org/wp-content/uploads/sites/10/2025/01/Leyenda_Coleccion6.pdf
// bosque natural 1. Floresta 1. Natural forest 1 #1f8d49
// 1.1. Formación forestal 1.1. Formação florestal 1.1. Forest formation 3 #1f8d49
// 1.2. Formación sabánica / Bosque 
// abierto
// 1.2. Formação savânica / Floresta 
// aberta
// 1.2. Savanna formation / Open 
// forest 4 #7dc975
// 1.3. Manglar 1.3. Mangue 1.3. Mangrove 5 #04381d
// 1.4. Bosque inundable 1.4. Floresta alagável 1.4. Flooded forest 6 #026975
// 2. Formación natural no forestal 2. Formação natural não 
// florestal 2. Non-forest natural formation 10 #d6bc74
// 2.1. Formación natural no forestal 
// inundable
// 2.1. Campo alagado e área 
// pantanosa 2.1. Wetland 11 #519799
// 2.2. Formación campestre o 
// herbazal
// 2.2. Formação campestre 2.2. Grassland 12 #d6bc74
// 2.3. Afloramiento rocoso 2.3. Afloramento rochoso 2.3. Rocky outcrop 29 #ffaa5f
// 2.4. Otra formación natural no 
// forestal
// 2.4. Outra formação não florestal 2.4. Other non-forest natural 
// formation 13 #d89f5c
// 3. Agropecuaria y silvicultura 3. Agropecuária e silvicultura 3. Farming and silviculture 14 #ffefc3
// 3.1 Pasto 3.1. Pastagem 3.1 Pasture 15 #edde8e
// 3.2 Agricultura 3.2. Agricultura 3.2 Agriculture 18 #E974ED
// 3.3 Silvicultura 3.3. Silvicultura 3.3 Silviculture 9 #7a5900
// 3.4 Palma aceitera 3.4. Cultura de palma 3.4 Oil palm 35 #9065d0
// 3.5 Mosaico de agricultura y/o 
// pastos 3.5. Mosaico de usos 3.5 Mosaic of uses 21 #ffefc3
// 4. Área sin vegetación 4. Área não vegetada 4. Non-vegetated area 22 #d4271e
// 4.1. Playa, duna o banco de arena 4.1. Praia, duna e areal 4.1. Beach, dune and sand spot 23 #ffa07a
// 4.2. Infraestructura urbana 4.2. Área urbanizada 4.2. Urban infrastructure 24 #d4271e
// 4.3. Minería 4.3. Mineração 4.3. Mining 30 #9c0027
// 4.4. Otra área natural sin 
// vegetación
// 4.4. Outras áreas naturais não 
// vegetadas
// 4.4. Other natural non
// vegetated area 68 #e97a7a
// 4.5. Otra área antrópica sin 
// vegetación
// 4.5. Outras áreas antropicas não 
// vegetadas
// 4.5. Other anthropic non
// vegetated area 25 #db4d4f
// 5. Cuerpo de agua 5. Corpo d'água 5. Water 26 #2532e4
// 5.1 Río, lago u océano 5.1 Rio, lago e oceano 5.1. River, lake and ocean 33 #2532e4
// 5.2 Glaciar 5.2. Geleira 5.2. Glacier 34 #93dfe6
// 6. No observado 6. Não observado 6. Not observed 27 #ffffff

// layers shown here have been pre-exported from the toolkit
var AMZ2019 = ee.Image("projects/servir-sco-assets/assets/SCO_AMZ/RAMI/MapBiomasCollection6_2019"),
    AMZ2020 = ee.Image("projects/servir-sco-assets/assets/SCO_AMZ/RAMI/MapBiomasCollection6_2020"),
    AMZ2021 = ee.Image("projects/servir-sco-assets/assets/SCO_AMZ/RAMI/MapBiomasCollection6_2021");
var AMZ_20_RC = AMZ2019.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],[0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var AMZ_21_RC = AMZ2020.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],[0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var AMZ_22_RC = AMZ2021.remap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],[0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var Forestxx = AMZ_20_RC.eq(1).clip(roi);
var Forestyy = AMZ_21_RC.eq(1).clip(roi); 
var MaskedFC_Perux = AMZ_20_RC.updateMask(Forestxx);
var MaskedFC_Peruy = AMZ_21_RC.updateMask(Forestyy);
// Generate forest cover change layer between the two years by subtracting the second year from the prior year. 
var forestloss_AMZ = Forestxx.subtract(Forestyy);
Map.addLayer(forestloss_AMZ.clip(roi), {}, 'forest dynamics amazon')
var AMZ_change_chart = ui.Chart.image.histogram({image: forestloss_AMZ.clip(roi),
                                          region: roi,
                                          scale: 100,
                                          // maxBuckets: 100,
                                          // minBucketWidth: 50,
                                          // maxRaw: 500,
                                          maxPixels: 3000000000})
                                          .setSeriesNames(['Area (ha.)'])
                                          .setOptions({title: 'forest area change - MapBiomas-Amazon collection 6', 
                                          hAxis: {title: 'Binary Classification'}, 
                                          vAxis: {title: 'Area (hectares)'}}); 

print(AMZ_change_chart);