/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var aoi = ee.FeatureCollection("projects/servir-sco-assets/assets/SCO_AMZ/RAMI/rami_box"),
    MadreDeDios = ee.FeatureCollection("projects/servir-sco-assets/assets/SCO_AMZ/RAMI/MadreDeDios"),
    MB2021 = ee.Image("projects/servir-sco-assets/assets/SCO_AMZ/RAMI2/Peru_MapBiomas2021"),
    MB2022 = ee.Image("projects/servir-sco-assets/assets/SCO_AMZ/RAMI2/Peru_MapBiomas2022"),
    MB2024 = ee.Image("projects/servir-sco-assets/assets/SCO_AMZ/RAMI2/Peru_MapBiomas2024"),
    MB2020 = ee.Image("projects/servir-sco-assets/assets/SCO_AMZ/RAMI2/Peru_MapBiomas2020"),
    MB2023 = ee.Image("projects/servir-sco-assets/assets/SCO_AMZ/RAMI2/Peru_MapBiomas2023");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
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

var RC_20 = MB2020.remap([0,1,3,4,5,6,9,10,11,12,13,14,15,18,21,22,23,24,25,26,27,29,30,31,32,33,34,35,40,61,66,68,70,72], [0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
var RC_21 = MB2021.remap([0,1,3,4,5,6,9,10,11,12,13,14,15,18,21,22,23,24,25,26,27,29,30,31,32,33,34,35,40,61,66,68,70,72], [0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
var RC_22 = MB2022.remap([0,1,3,4,5,6,9,10,11,12,13,14,15,18,21,22,23,24,25,26,27,29,30,31,32,33,34,35,40,61,66,68,70,72], [0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
var RC_23 = MB2023.remap([0,1,3,4,5,6,9,10,11,12,13,14,15,18,21,22,23,24,25,26,27,29,30,31,32,33,34,35,40,61,66,68,70,72], [0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
var RC_24 = MB2024.remap([0,1,3,4,5,6,9,10,11,12,13,14,15,18,21,22,23,24,25,26,27,29,30,31,32,33,34,35,40,61,66,68,70,72], [0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
var Forestx = RC_23.eq(1).clip(MadreDeDios);
var Foresty = RC_24.eq(1).clip(MadreDeDios); 
var MaskedFC91 = RC_22.updateMask(Forestx);
var MaskedFC16 = RC_24.updateMask(Foresty);
var forestloss = Forestx.subtract(Foresty);
Map.addLayer(forestloss.clip(MadreDeDios), {}, 'forest gain')
var change_chart = ui.Chart.image.histogram({image: Forestx.clip(MadreDeDios),
                                          region: MadreDeDios,
                                          scale: 100,
                                          // maxBuckets: 100,
                                          // minBucketWidth: 50,
                                          // maxRaw: 500,
                                          maxPixels: 3000000000})
                                          .setSeriesNames(['Area (ha.)'])
                                          .setOptions({title: 'forest area change', 
                                          hAxis: {title: 'Binary Classification'}, 
                                          vAxis: {title: 'Area (hectares)'}}); 

print(change_chart);
