import Map from "@arcgis/core/Map.js";
import SceneView from "@arcgis/core/views/SceneView.js";
import SceneLayer from "@arcgis/core/layers/SceneLayer.js";
import MapView from "@arcgis/core/views/MapView.js";
import Basemap from "@arcgis/core/Basemap.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import "./style.css";
import React from "react";
import SelectComponent from "./filtros.jsx";
import Dashboard from "./dashboard.jsx";
import variables from './variables';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';


// const container = document.getElementById("app-container");
// ReactDOM.render(<SelectComponent />, container);

/*
// Create Map
const map = new Map({
  basemap: "dark-gray-vector",
  ground: "world-elevation"
});

// Create the SceneView
const view = new SceneView({
  container: "viewDiv",
  map: map,
  camera: {
    position: [-74.0338, 40.6913, 707],
    tilt: 81,
    heading: 50
  }
});

// Create SceneLayer and add to the map
const sceneLayer = new SceneLayer({
  portalItem: {
    id: "2e0761b9a4274b8db52c4bf34356911e"
  },
  popupEnabled: false
});
map.add(sceneLayer);

// Create MeshSymbol3D for symbolizing SceneLayer
const symbol = {
  type: "mesh-3d", // autocasts as new MeshSymbol3D()
  symbolLayers: [
    {
      type: "fill", // autocasts as new FillSymbol3DLayer()
      // If the value of material is not assigned, the default color will be grey
      material: {
        color: [244, 247, 134]
      }
    }
  ]
};
// Add the renderer to sceneLayer
sceneLayer.renderer = {
  type: "simple", // autocasts as new SimpleRenderer()
  symbol: symbol
};
*/

// const popupAyudas_Navegacion_Publicas = {
//   // Enable a popup
//   title: "{NOMBRE}", // Show attribute value
//   //"Autor: {AUTORES}; año de publicación: {AÑO}; Palabras claves de tema: {DISCIPLINA}, link Cecoldo: {LINK}"
//   content: [{
//       type: "fields",
//       fieldInfos: [{
//           fieldName: "Nombre",
//           label: ":"
//       }, {
//           fieldName: "AÑO",
//           label: "año de publicación:"
//       }, {
//           fieldName: "UBICACION",
//           label: "Área de estudio:"
//       }, {
//           fieldName: "DISCIPLINA",
//           label: "Palabras claves de tema:"
//       }, {
//           fieldName: "LINK",
//           label: "link Cecoldo:"
//       }]
//   }]
// }


// var featureLayer = new FeatureLayer({
//   url: "https://services6.arcgis.com/RB7c27NVd25mjSSc/ArcGIS/rest/services/Senalizacion_Capitanias/FeatureServer/0",
//   outFields: ["*"], // Return all fields so it can be queried client-side
//   visible: true,        
// });

// var featureLayer2 = new FeatureLayer({
//   url: "https://services6.arcgis.com/RB7c27NVd25mjSSc/ArcGIS/rest/services/Ayudas_Navegacion_Publicas_WFL1/FeatureServer/0",
//   outFields: ["*"], // Return all fields so it can be queried client-side
//   visible: true,        
// });

variables.featureLayer = new FeatureLayer({
  url: variables.servicio,
  outFields: ["*"], // Return all fields so it can be queried client-side
});


const container = document.getElementById('app-container');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<SelectComponent />);

const container2 = document.getElementById('viewDiv');
const root2 = createRoot(container2); // createRoot(container!) if you use TypeScript
root2.render(<Dashboard />);