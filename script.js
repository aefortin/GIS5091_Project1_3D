require([
  "esri/Map",
  "esri/views/SceneView",
  "esri/layers/FeatureLayer",
  "esri/layers/ImageryLayer",
  "esri/widgets/Legend"
], function(Map, SceneView, FeatureLayer, ImageryLayer, Legend) {
  const map = new Map({
    basemap: "topo",
    ground: "world-elevation" // Use the world elevation service for 3D ground
  });

  const view = new SceneView({
    container: "viewDiv",
    map: map,
    viewingMode: 'global',
    environment: {
      atmosphere: { quality: "high" },
      lighting: {
        directShadowsEnabled: true,
        date: new Date()
      }
    }
  });

  // Adding the first feature layer
  var featureLayer_1 = new FeatureLayer({
    url: "https://services3.arcgis.com/bWPjFyq029ChCGur/arcgis/rest/services/Counties/FeatureServer"
  });
  map.add(featureLayer_1);

  
var featureLayer_2 = new FeatureLayer({
    url: "https://services1.arcgis.com/4yjifSiIG17X0gW4/arcgis/rest/services/MedianHHIncomeByAge_Tract_2012_2016/FeatureServer",
    popupTemplate: {
        title: "Median Household Income", 
        content: [
            {
                type: "text", // 
                text: "The median household income for this area is <b>${MedianIncome}</b>." 
            }
        ]
    }
});
map.add(featureLayer_2);

 
  var featureLayer_3 = new FeatureLayer({
    url: "https://services3.arcgis.com/bWPjFyq029ChCGur/arcgis/rest/services/LICs_or_DACs_Designated_by_California/FeatureServer"
  });
  map.add(featureLayer_3);

  
  var imageLayer_1 = new ImageryLayer({
    url: "https://gis.nnvl.noaa.gov/arcgis/rest/services/HINDZ/Evening_Heat_Index_in_Cities/ImageServer",
    opacity: 0.6
  });
  map.add(imageLayer_1);
  
  var legend1 = new Legend({
    view: view,
    layerInfos: [{
      layer: imageLayer_1,
      title: "Evening Heat Index"
    }]
  });

  view.ui.add(legend1, "bottom-right");

  var legend2 = new Legend({
    view: view,
    layerInfos: [{
      layer: featureLayer_2,
      title: "Median Household Income by Age"
    }]
  });

  view.ui.add(legend2, "bottom-left");

 
  view.when().then(function() {
    view.goTo({
      position: {
        latitude: 37.3382,
        longitude: -121.8863,
        z: 1500 
      },
      tilt: 75,
      heading: 150 
    });
  });
});
