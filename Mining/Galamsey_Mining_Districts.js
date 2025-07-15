var AOI = ee.FeatureCollection("projects/servir-sco-assets/assets/SCO_WA/roi_ghana");
var AOI_level2 = ee.FeatureCollection('WM/geoLab/geoBoundaries/600/ADM1').filterBounds(AOI).filter(ee.Filter.inList('shapeName', ['Ahafo Region']));
// Disticts in Ghana that overlap with the mining: Ashanti, Ahafo, Central, Eastern, Western, Bono, Western North, 
var styleParams = {
  fillColor: 'b5ffb4',
  color: '00909F',
  width: 1.0,
};

Map.addLayer(AOI_level2, styleParams, 'Second Level Administrative Units')
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
Map.addLayer(post_2015_mining,{palette:'pink'},"post_2015_mining",false);
 
Map.addLayer(total_mining_2024,{palette:'cyan'},"Total Mined area thru 2024",false);
var Expansion_chart = ui.Chart.image.histogram({image: mining_2015.mean().unmask(),
                                          region: AOI_level2,
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

