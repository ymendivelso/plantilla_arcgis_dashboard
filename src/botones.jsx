import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import variables from './variables';

export default function BasicButtons() {

    const BotonAplicar = (e) =>{

        if (variables.capaFilterMap == variables.featureLayer2) {
            console.log("variables.filtrosvalores", variables.filtrosvalores, e, e.target.value, e.target.innerHTML);
            variables.capaFilterMap.definitionExpression = `${variables.filtroCapitania} and ${variables.filtroTipoayuda} and ${variables.filtroClasificacion}`;            
        } else if (variables.capaFilterMap == variables.featureLayer3) {
            variables.capaFilterMap.definitionExpression = `${variables.filtroCapitania} and ${variables.filtroTipoayuda} and ${variables.filtroInstalacionPortuaria}`;    
        } else if (variables.capaFilterMap == variables.featureLayer5) {
            variables.capaFilterMap.definitionExpression = `${variables.filtroCapitaniaFondeo} and ${variables.filtroNombreFondeo}`;    
        } else if (variables.capaFilterMap == variables.featureLayer4) {
            variables.capaFilterMap.definitionExpression = `${variables.filtroCapitaniaCanal} and ${variables.filtroNombreCanal} and ${variables.filtroCategoriaCanal}`;    
        } 
        
        variables.capaFilterMap.queryExtent().then(function(results){
            // go to the extent of the results satisfying the query
            variables.view.goTo(results.extent);
        });
    }

    const BotonLimpiar = (e) =>{
        console.log("variables.filtrosvalores", variables.filtrosvalores, e, e.target.value, e.target.innerHTML);
        variables.capaFilterMap.definitionExpression = "1=1";

        variables.capaFilterMap.queryExtent().then(function(results){
            // go to the extent of the results satisfying the query
            variables.view.goTo(results.extent);
        });
    }


  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" onClick={BotonAplicar}>Aplicar</Button>
      <Button variant="contained" onClick={BotonLimpiar}>Limpiar</Button>
    </Stack>
  );
}