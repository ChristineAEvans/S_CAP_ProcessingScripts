// This GEE script contains all of the biomass datasets utilized within the S-CAP project 
// Data collection and pre-processing before upload by Emil Cherrington 
// Script by Christine Evans 
// Date 06/25/25

// pre-print behind data usage and comparisons found: Cherrington, E. A., Evans, C. A., Limaye, A. S., Anderson, E. R., & Flores-Anderson, A. I. (2024). Reviews and syntheses: One forest carbon model to rule them all? Utilizing ensembles of forest cover and biomass datasets to determine carbon budgets of the world’s forest ecosystems. EGUsphere, 2024, 1-32.

var Liu2015 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/agb_ref/global_agb_2000_liu__reup");
// Liu original date range: 2000-2010; global scale, includes non-forest agb; original spatial resolution: 25km
// data layer shown: 2000 at 1km resolution 

var Ruesch_Gibbs2008 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/agb_ref/global_agb_2000_ruesch_gibbs_1km");
// Ruesch and Gibbs original date range: 2000; global scale, includes non-forest agb; original spatial resolution: 1km
// data layer shown: 2000 at 1km resolution 

var Xu2000 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/agb_ref/global_agb_2000_xu__reup");
var Xu2010 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/agb_ref/global_agb_2010_xu_1km_nn");
var Xu2019 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/agb_ref/global_agb_2019_xu_1km_nn");
// Xu original date range: 2000-2019; global scale, includes non-forest agb; original spatial resolution: 10km
// data layer: 2000, 2010, 2019 at 1km resolution 

var Baccini2021 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/agb_ref/global_agb_2003_baccini__reup");
// Baacini original date range: 2000; global scale, includes non-forest agb; original spatial resolution: 0.3km
// data layer: 2000 at 1km resolution 

var GeoCarbon2016 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/agb_ref/global_agb_2003_geocarbon_1km");
// Liu original date range: 2005; global scale, original spatial resolution: 1km
// data layer: 2005 at 1km resolution 

var Zhang_Liang2020 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/agb_ref/global_agb_2003_zhang_liang_1km");
// Zhang & Liang original date range: 2005; global scale, includes non-forest agb; original spatial resolution: 1km
// data layer: 2005 at 1km resolution 

var Hu2016 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/agb_ref/global_agb_2004_hu_1km");
// Hu original date range: 2004; global scale, original spatial resolution: 1km
// data layer: 2004 at 1km resolution 

var Kindermann2005 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/agb_ref/global_agb_2005_kindermann_1km_nn");
// Kindermann original date range: 2005; global scale, original spatial resolution: 50km
// data layer: 2005 at 1km resolution 

var Yang2005 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/agb_ref/global_agb_2005_yang_1km");
// Yang original date range: 2005; global scale, original spatial resolution: 1km
// data layer: 2005 at 1km resolution 

var CCI2010_v3 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/agb_ref/global_agb_2010_cci_biomass_v3_1km");
var CCI2010_v4 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/agb_ref/global_agb_2010_cci_biomass_v4_1km");
var CCI2020 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/agb_ref/global_agb_2020_cci_biomass_v4_1km");
// CCI original date range: 2010, 2017-2020; global scale, includes non-forest agb; original spatial resolution: .1km
// data layer: 2010, 2020 at 1km resolution 
// original layers sourced from: https://gee-community-catalog.org/projects/cci_agb/?h=cci+b

var Globiomass2010 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/agb_ref/global_agb_2010_globiomass_1km");
// Globiomass original date range: 2010; global scale, includes non-forest agb; original spatial resolution: .1km
// data layer: 2010 at 1km resolution 

var Spawn2020 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/agb_ref/global_agb_2010_spawn_1km");
// Spawn original date range: 2010; global scale, includes non-forest agb; original spatial resolution: .3km
// data layer: 2020 at 1km resolution 

var Avitable2016 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/agb_ref/tropics_agb_2000_avitabile_1km");
// Avitable original date range: 2005; tropics scale, includes non-forest agb; original spatial resolution: 1km
// data layer: 2005 at 1km resolution 

var Saatchi2011 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/agb_ref/tropics_agb_2000_saatchi_1km");
// Saatchi original date range: 2000; tropics scale, includes non-forest agb; original spatial resolution: 1km
// data layer: 2000 at 1km resolution 

var Baccini2012 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/agb_ref/tropics_agb_2008_baccini_2012_1km_nn");
// Baccini original date range: 2008; global scale, includes non-forest agb; original spatial resolution: 1km
// data layer: 2008 at 1km resolution 

var GEDI2020_v1 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/agb_ref/tropics_agb_2020_gedi_l4b_v2_0_2020_1km");
var GEDI2020_v2 = ee.Image("projects/servir-sco-assets/assets/tmp_servir_cms/agb_ref/tropics_agb_2020_gedi_l4b_v2_1_2020_1km");
// Dubayah et al (GEDI) original date range: 2020; tropics scale, includes non-forest agb; original spatial resolution: 1km
// data layer: 2020 at 1km resolution 
// original layers sourced from: https://developers.google.com/earth-engine/datasets/catalog/LARSE_GEDI_GEDI04_B_002
// var l4b = ee.Image('LARSE/GEDI/GEDI04_B_002')
// Map.addLayer(l4b.select('MU'), {min: 10, max: 250, palette: '440154,414387,2a788e,23a884,7ad151,fde725'},'Mean Biomass');