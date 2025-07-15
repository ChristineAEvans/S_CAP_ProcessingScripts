// The following Google Earth Engine Scripts ingests the annual ESRI 10m Land Cover product provided by the the Impact Observatory for ESRI (https://api.impactobservatory.com/stac-aws/collections/io-10m-annual-lulc/items)
// The orininally classification values, color codes, and description can be found at https://gee-community-catalog.org/projects/S2TSLULC/

// Script Author: Christne Evans (cae0004@uah.edu) 
// Copied over: 04/08/2025

// ESRI 10m Annual Land Cover (2017-2023) is a global coverage dataset derived from ESA Sentinel-2 imagery with a spacial resolution of 10 meters. Can be used on roi of choice.
// National scale roi sourced from The United States Office of the Geographer provides the Large Scale International Boundary (LSIB) dataset (ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"))

// Define ROI & filter with name of country of interest
var roi = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017").filter(ee.Filter.inList('country_na', ['Zambia'])); 
var outline4 = ee.Image().byte().paint({featureCollection:roi,width:2});
Map.addLayer(outline4, {palette: ['black']},'AOI', true);

// Center console to match ROI
Map.centerObject(roi, 8);

// Ingest ESRI 10m Annual Land Cover data for years of interest; visualize over roi
var esri_lulc10 = ee.ImageCollection("projects/sat-io/open-datasets/landcover/ESRI_Global-LULC_10m_TS");
var BoundsFilter = esri_lulc10.filterBounds(roi);

// Classication Scheme
// 1. Water Areas where water was predominantly present throughout the year; may not cover areas with sporadic or ephemeral water; contains little to no sparse vegetation, no rock outcrop nor built up features like docks; examples: rivers, ponds, lakes, oceans, flooded salt plains.
// 2. Trees Any significant clustering of tall (~15 feet or higher) dense vegetation, typically with a closed or dense canopy; examples: wooded vegetation, clusters of dense tall vegetation within savannas, plantations, swamp or mangroves (dense/tall vegetation with ephemeral water or canopy too thick to detect water underneath).
// 3.Flooded vegetation Areas of any type of vegetation with obvious intermixing of water throughout a majority of the year; seasonally flooded area that is a mix of grass/shrub/trees/bare ground; examples: flooded mangroves, emergent vegetation, rice paddies and other heavily irrigated and inundated agriculture.
// 4.Crops Human planted/plotted cereals, grasses, and crops not at tree height; examples: corn, wheat, soy, fallow plots of structured land.
// 5. Built Area Human made structures; major road and rail networks; large homogeneous impervious surfaces including parking structures, office buildings and residential housing; examples: houses, dense villages / towns / cities, paved roads, asphalt.
// 6.Bare ground Areas of rock or soil with very sparse to no vegetation for the entire year; large areas of sand and deserts with no to little vegetation; examples: exposed rock or soil, desert and sand dunes, dry salt flats/pans, dried lake beds, mines.
// 7. Snow/Ice Large homogeneous areas of permanent snow or ice, typically only in mountain areas or highest latitudes; examples: glaciers, permanent snowpack, snow fields.
// 8. Clouds No land cover information due to persistent cloud cover.
// 9. Rangeland Open areas covered in homogeneous grasses with little to no taller vegetation; wild cereals and grasses with no obvious human plotting (i.e., not a plotted field); examples: natural meadows and fields with sparse to no tree cover, open savanna with few to no trees, parks/golf courses/lawns, pastures. Mix of small clusters of plants or single plants dispersed on a landscape that shows exposed soil or rock; scrub-filled clearings within dense forests that are clearly not taller than trees; examples: moderate to sparse cover of bushes, shrubs and tufts of grass, savannas with very sparse grasses, trees or other plants.

// Define a dictionary which will be used to make legend and visualize image on map
var dict = {"names": ["Water", "Trees", "Flooded Vegetation", "Crops", "Built Area", "Bare Ground", "Snow/Ice", "Clouds", "Rangeland"],
  "colors": ["#1A5BAB", "#358221", "#87D19E", "#FFDB5C", "#ED022A", "#EDE9E4", "#F2FAFF", "#C8C8C8", "#C6AD8D"]};
  
  function remapper(image){
    var remapped = image.remap([1,2,4,5,7,8,9,10,11],[1,2,3,4,5,6,7,8,9])
    return remapped
  }

var palette = ["#1A5BAB", "#358221", "#000000", "#87D19E", "#FFDB5C", "#000000", "#ED022A", "#EDE9E4", "#F2FAFF", "#C8C8C8", "#C6AD8D",];

// Create a panel to hold the legend widget
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});

// Function to generate the legend
function addCategoricalLegend(panel, dict, title) {
  
  // Create and add the legend title.
  var legendTitle = ui.Label({
    value: title,
    style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 0 4px 0',
      padding: '0'
    }
  });
  panel.add(legendTitle);
  
  var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
  panel.add(loading);
  
  // Creates and styles 1 row of the legend.
  var makeRow = function(color, name) {
    // Create the label that is actually the colored box.
    var colorBox = ui.Label({
      style: {
        backgroundColor: color,
        // Use padding to give the box height and width.
        padding: '8px',
        margin: '0 0 4px 0'
      }
    });
  
    // Create the label filled with the description text.
    var description = ui.Label({
      value: name,
      style: {margin: '0 0 4px 6px'}
    });
  
    return ui.Panel({
      widgets: [colorBox, description],
      layout: ui.Panel.Layout.Flow('horizontal')
    });
  };
  
  // Get the list of palette colors and class names from the image.
  var palette = dict['colors'];
  var names = dict['names'];
  loading.style().set('shown', false);
  
  for (var i = 0; i < names.length; i++) {
    panel.add(makeRow(palette[i], names[i]));
  }
  
  Map.add(panel);
  
}


/*
  // Display map and legend ///////////////////////////////////////////////////////////////////////////////
*/

// Add the legend to the map
addCategoricalLegend(legend, dict, 'Land Cover Class');

// Add image to the map
var ESRI2017 = ee.ImageCollection(esri_lulc10.filterDate('2017-01-01','2017-12-31').mosaic()).map(remapper);
var ESRI2018 = ee.ImageCollection(esri_lulc10.filterDate('2018-01-01','2018-12-31').mosaic()).map(remapper);
var ESRI2019 = ee.ImageCollection(esri_lulc10.filterDate('2019-01-01','2019-12-31').mosaic()).map(remapper);
var ESRI2020 = ee.ImageCollection(esri_lulc10.filterDate('2020-01-01','2020-12-31').mosaic()).map(remapper);
var ESRI2021 = ee.ImageCollection(esri_lulc10.filterDate('2021-01-01','2021-12-31').mosaic()).map(remapper);
var ESRI2022 = ee.ImageCollection(esri_lulc10.filterDate('2022-01-01','2022-12-31').mosaic()).map(remapper);
var ESRI2023 = ee.ImageCollection(esri_lulc10.filterDate('2023-01-01','2023-12-31').mosaic()).map(remapper);

var MosaicImages2017 = ESRI2017.select(0).mean()
var MosaicImages2018 = ESRI2018.select(0).mean()
var MosaicImages2019 = ESRI2019.select(0).mean()
var MosaicImages2020 = ESRI2020.select(0).mean()
var MosaicImages2021 = ESRI2021.select(0).mean()
var MosaicImages2022 = ESRI2022.select(0).mean()
var MosaicImages2023 = ESRI2023.select(0).mean()

Map.addLayer(MosaicImages2017.clip(roi), {min:1, max:10, palette:dict['colors']}, 'ESRI LULC 10m 2017' , true); // Replace with year of interest
Map.addLayer(MosaicImages2018.clip(roi), {min:1, max:10, palette:dict['colors']}, 'ESRI LULC 10m 2018' , true); // Replace with year of interest

// Reclassify oringal landcover scheme to forest/non-forest (1/0) "ESRI10_Reclass[yr]"
var ESRI10_Reclass17 = MosaicImages2017.remap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
var ESRI10_Reclass18 = MosaicImages2018.remap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);

// Generate forest cover change layer between the two years by subtracting the second year from the prior year. 
var Change = ESRI10_Reclass17.subtract(ESRI10_Reclass18);
// Optional Visualization -- Map.addLayer(Change, {min: -1.0, max: 1.0, palette: ['33ffe0', '676868', 'dd3d26']}, 'Change Layer');
var Gain = Change.eq(-1);
var Loss = Change.eq(1); 
var NoChange = Change.eq(0);

// Use a histogram to resample and estimate quanity of each change type; print to console
var ESRI_ChangeChart = ui.Chart.image.histogram({image: Change.clip(roi),region: roi,scale: 100, maxPixels: 3000000000}).setSeriesNames(['Area (ha.)']).setOptions({title: 'ESRI Forest Loss, xx-yy',hAxis: {title: 'Binary Classification'},vAxis: {title: 'Area (hectares)'}}); 
print(ESRI_ChangeChart);