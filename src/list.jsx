import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import variables from './variables';
import { useState, useEffect} from 'react';
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter.js";
import FeatureEffect from "@arcgis/core/layers/support/FeatureEffect.js";

function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

// function renderRow2({listResult}) {
const RenderRow2 = (props) => {
  const { listResult } = props;
  let result = listResult.map((item, i) => {
    return (
      <ListItem key={i}>
        <ListItemButton>
          <ListItemText primary={`${item}`} />
        </ListItemButton>
      </ListItem>
    );
  },[])

  return (
    <div>
      {result}
    </div>    
  );
}

export default function VirtualizedList({text}) {

  const [ resultado, setResultado] = useState([]);

  const camposSearch = {
    "Ayudas publicas Filtro": ["Nombre", "Tipo", "Ubicacion", "Clasificacion"],
    "Ayudas privadas Filtro": ["Nombre", "Tipo", "InstalacionPortuaria", "Ubicacion"],
    "Canales Filtro": ["Nombre"],
    "Fondeo Filtro": ["Nombre_Zona"]
  }

  function updateList (list) {
    setResultado(list);
  }


  useEffect(
    () => {
      if (text.length >  4) {

      const fetchData = async () => {

        let capas = variables.map.layers;
        const foundLayer = variables.map.allLayers.filter(function(layer) {
          console.log(layer);
          return layer.title.includes("Filtro");
        });    

        // setResultado([]);
    
        let resultados = []
        
        foundLayer.forEach(function(item, i){
          if (item.title != "Fondeo Filtro") {
            console.log("layer", item); 
            let campo = camposSearch[item.title][0];
            let query = item.createQuery();
            query.outFields = campo;
            query.where = `${campo} LIKE '%${text}%'`
            query.returnDistinctValues = true;
            query.returnGeometry = false;   
            resultados.push(item.queryFeatures(query));
            // .then(function(response){
            //   console.log(response, "responsequery")
            //   if (response.features.length > 0){
            //     response.features.forEach ((f) => {
            //       let valor = f.attributes[camposSearch[item.title][0]];
            //       console.log(f, "feature", valor);
            //       resultados.push(valor);
            //     })
            //   }          
            // });
          }      
        });
    
        // console.log("capas", capas, foundLayer, resultados)
        console.log("capas", capas, foundLayer, resultados, resultados.length)

        const response = await Promise.all(resultados);

        let listas = []

        response.forEach(function(item){
          console.log("item", item)
          if (item.features.length > 0){
            item.features.forEach ((f) => {
              let valor = f.attributes[camposSearch[f.sourceLayer.title][0]];
              console.log(f, "feature", valor);
              listas.push({"valor": valor, "capa": f.sourceLayer.title});    
            })
          } 
        })

        console.log("listas", listas)

        // return listas;

        setResultado(listas);


        // updateList(resultados);
        // setResultado(resultados);
      // }     

      // const fetchData = async (resul) => {
      //   let listas = []
      //   try {
      //     // Realizar la solicitud a la API (aquí se usa Axios como ejemplo)
      //     const response = await Promise.all(resul);

      //     response.forEach(function(item, i){
      //       if (response.features.length > 0){
      //         response.features.forEach ((f) => {
      //           let valor = f.attributes[camposSearch[item.title][0]];
      //           console.log(f, "feature", valor);
      //           listas.push(valor);
      //         })
      //       } 
      //     })

      //     console.log("listas", listas)

      //     return listas;
          
      //     // Actualizar el estado con los datos recibidos de la API
      //     // setData(response.data); // Suponiendo que los datos son un array recibido de la API
      //   } catch (error) {
      //     console.error('Error al obtener datos de la API:', error);
      //   }
      // };
      }

      fetchData();

      }

    },
    [text]
  );

  const ClicList = (e) => {

    let capas = {
      "Ayudas publicas Filtro": [variables.featureLayer2, variables.featureLayer2Filter],
      "Ayudas privadas Filtro": [variables.featureLayer3, variables.featureLayer3Filter],
      "Canales Filtro": [variables.featureLayer4, variables.featureLayer4Filter],
      "Fondeo Filtro": [variables.featureLayer5, variables.featureLayer5Filter]
    }   

    let capas2 = Object.assign(capas);

    // let objeto = resultado.filter(obj => obj["valor"] == e.target.innerHTML) 
    let objeto = resultado.filter(obj => obj["valor"].includes(e.target.outerText))

    console.log(e, "ClicList", e.target.value, e.target.outerText, e.target.innerHTML, objeto, resultado);

    // delete capas2[objeto[0]["capa"]];

    console.log("capas2", objeto[0]["capa"], capas, capas2);

    let capa = capas[objeto[0]["capa"]][0]
    let capa2 = capas[objeto[0]["capa"]][1]

    // capa.definitionExpression = `Nombre = '${e.target.innerHTML}'`;
    let filtro = `Nombre LIKE '%${e.target.outerText}%'`;

    // capa.definitionExpression = `Nombre LIKE '%${e.target.outerText}%'`;
    // let query = capa.createQuery();
    // query.where = filtro;

    capa2.definitionExpression = `Nombre LIKE '%${e.target.outerText}%'`;

    const featureFilter = new FeatureFilter({
      where: filtro
    });

    for (const [key, value] of Object.entries(capas)) {
      if ( key != objeto[0]["capa"]) {
        value[0].opacity = 0.3;
        // console.log(`${key}: ${value}`);
      }      
    }

    capa.featureEffect = new FeatureEffect({
      filter: featureFilter,
      // excludedEffect: "blur(5px) grayscale(30%) opacity(20%)"
      excludedEffect: "opacity(30%)"
    });

    // capa.queryFeatures(query).then(function(results){
    capa2.queryExtent().then(function(results){
    // capa.queryExtent().then(function(results){
      // go to the extent of the results satisfying the query
      // variables.view.goTo(results.extent, { zoom: 4});
      // variables.view.goTo(results, { zoom: 4});
      console.log("results", results, capa2.geometryType);

      if (capa2.geometryType == 'point') {
        variables.view.goTo({
          center: [results.extent.center.longitude, results.extent.center.latitude],
          zoom: 15
        });
      } else {
        variables.view.goTo(results.extent);
      }

      

   

      // variables.view.zoom = 4;
    });



  }


  if (text.length >  4) {
    return (    

      
      <Box
        sx={{ width: '100%', height: 350, maxWidth: 360, bgcolor: 'background.paper' }}
      >
        <List sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        '& ul': { padding: 0 },
      }}>
          {resultado.map((result, index) => (
            // let nuevosdatos = result.split(',');secondary={result[1]}
            <ListItem key={index}>
              <ListItemButton onClick={ClicList}> 
                <ListItemText primary={`${result["valor"]}`}  />
              </ListItemButton>
           </ListItem>
           ))}
        </List>
        {/* <FixedSizeList height={400} itemSize={50}>
          {resultado.map((item, i) => {                
            <ListItem key={i}>
              <ListItemButton>
                <ListItemText primary={`${item}`} />
              </ListItemButton>
            </ListItem>                
            },[])}
        </FixedSizeList> */}
        </Box>
      
    )
  }
  
}