/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var aoi = ee.FeatureCollection("projects/servir-sco-assets/assets/SCO_AMZ/RAMI/rami_box"),
    Mining22 = ee.FeatureCollection("projects/servir-sco-assets/assets/SCO_AMZ/RAMI2/Composite22P"),
    Mining23 = ee.FeatureCollection("projects/servir-sco-assets/assets/SCO_AMZ/RAMI2/Composite23P"),
    Mining24 = ee.FeatureCollection("projects/servir-sco-assets/assets/SCO_AMZ/RAMI2/Composite24P");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
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

