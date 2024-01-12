import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import variables from './variables'

export default function RadioButtonsGroup() {

    const cambioBusqueda = (e, v) => {
        console.log("datos",e,v,variables)

        variables.tipodebusqueda = v;

        variables.actualizarGrupo(v);
    }


  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Tipo de Busqueda:</FormLabel>
      <RadioGroup
        onChange={cambioBusqueda}
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="ayudas"
        name="radio-buttons-group"
      >
        <FormControlLabel value="ayudas" control={<Radio />} label="Ayudas a la navegación" />
        <FormControlLabel value="fondeo" control={<Radio />} label="Zonas de fondeo" />
        <FormControlLabel value="canal" control={<Radio />} label="Configuración geométrica de canal" />
      </RadioGroup>
    </FormControl>
  );
}