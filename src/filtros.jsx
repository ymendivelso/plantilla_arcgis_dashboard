import React from "react";
import { useState, useEffect } from 'react';
import ComboBox from "./select.jsx";
import RadioButtonsGroup from "./radio.jsx";
import BasicButtons from "./botones.jsx";
import TextField from '@mui/material/TextField';
import variables from './variables'
import uniqueValues from "@arcgis/core/smartMapping/statistics/uniqueValues";
import VirtualizedList from "./list.jsx";

const SelectComponent = () => {

  const [ grupo, setGrupo ] = useState(variables.tipodebusqueda);
  const [ opciones, setOpciones ] = useState([]);
  const [ tipoayuda, setTipoayuda ] = useState([]);
  const [ clasificaciones, setClasificaciones ] = useState([]);
  const [ entidad, setEntidad ] = useState("none");
  const [ clasificacion, setClasificacion ] = useState("none");
  const [ entidades, setEntidades ] = useState([]);
  const [ capitaniasFondeo, setCapitaniasFondeo ] = useState([]);
  const [ nombreFondeo, setNombreFondeo ] = useState([]);
  const [ capitaniasCanal, setCapitaniasCanal ] = useState([]);
  const [ nombreCanal, setNombreCanal ] = useState([]);
  const [ categoriasCanal, setCategoriasCanal ] = useState([]);
  const [ filtrosayudas, setFiltrosayudas] = useState("none");
  const [ filtroCapitania, setFiltroCapitania] = useState("1=1");
  const [ filtroTipoayuda, setFiltroTipoayuda] = useState("1=1");
  const [ filtroClasificacion, setFiltroClasificacion] = useState("1=1");
  const [ filtroRapido, setfiltroRapido] = useState("");

  // let campo2 = variables.featureLayer5Filter.getField("Capitania");

  // let dominios2 = campo2.toJSON();

  // uniqueValues({
  //   layer: variables.featureLayer5Filter,
  //   field: "Capitania"
  // }).then(function(response) {
  //     // prints each unique value and the count of features containing that value
  //     var infos = response.uniqueValueInfos;
  //     console.log("infos",response, infos)
  //     infos.forEach(function(info) {
  //         console.log(dominios2.domain.codedValues.filter(e => e.code == info.value))
  //         if (info.value != null) {
  //             capitanias.push({label: dominios2.domain.codedValues.filter(e => e.code == info.value)[0].name, id: info.value})                    
  //         }
  //     });

  //     console.log("capitanias21",capitanias)

  //     setCapitanias(capitanias);
  // });

  const grupos = {
    "capa1": variables.campos
  }


  const ChangeOption = (e, value, reason, details) => {
    console.log(e, value, reason, details, e.target, e.target.parentNode);

    if (grupo == "ayudas") {
      if (e.target.id.includes("Capitanía")) {
        // if (variables.filtrosvalores != "") {
        //   variables.filtrosvalores += " and "
        // }
        variables.filtroCapitania = `Capitania = ${value.id}`
        setFiltroCapitania(`Capitania = ${value.id}`);
      } else if (e.target.id.includes("Tipo de ayuda")) {
        variables.filtroTipoayuda = `Tipo = '${value.label}'`
        setFiltroTipoayuda(`Tipo = '${value.label}'`);
      } else if (e.target.id.includes("Clasificación")) {
        variables.filtroClasificacion = `Clasificacion = '${value.label}'`;
        setFiltroClasificacion(`Clasificacion = '${value.label}'`);
      } else if (e.target.id.includes("Entidad")) {
        variables.filtroInstalacionPortuaria = `InstalacionPortuaria = '${value.label}'`;
      }
  
      // let filtro = `${filtro1}`
      console.log(filtros, "arrays");
  
      // for (let index = 0; index < filtros.length; index++) {
      //   if (index == 0) {
      //     variables.filtrosvalores = filtros[index];
      //   } else {
      //     variables.filtrosvalores += ` and ${filtros[index]}`
      //   }        
      // }
  
      // if (filtros.length > 1) {
        
      // }
  
      console.log("EVENT",variables.filtrosvalores, e, value);
      const capa1 = variables.featureLayer2;
      const capa2 = variables.featureLayer3;
      const capa3 = variables.featureLayer2Filter;
      const capa4 = variables.featureLayer3Filter;
      // console.log("EVENT2", e.target.value, e.target.textContent, e.target, e.target.id, variables.featureLayer2);
      console.log(e.target.id.includes("Tipo de canal"));
      if (e.target.id.includes("Tipo de canal")) {
        setFiltrosayudas("block");
          if (e.target.id.includes("option-0")) {
            variables.capaFilter = capa3;
            variables.capaFilterMap = capa1;
            capa1.visible = true;      
            capa2.visible = false;      
            setEntidad("none");
            setClasificacion("block");
          } else if (e.target.id.includes("option-1")) {
            variables.capaFilter = capa4;  
            variables.capaFilterMap = capa2;
            capa1.visible = false;   
            capa2.visible = true;      
            setEntidad("block");
            setClasificacion("none");
          }             
      } 
  
      let capitanias = [];
      let tipoayuda = [];
      let clasificacion = [];
      let entidades = [];
  
      // console.log("Capitania",variables.capaFilter.getField("Capitania"))
  
      let campo = variables.capaFilter.getField("Capitania");
  
      let dominios = campo.toJSON();
  
      console.log("Capitania",variables.capaFilter.getField("Capitania"),dominios, variables.filtroCapitania, variables.filtroTipoayuda, variables.filtroClasificacion);    
      
      let filtroCap = variables.capaFilter == capa3 ? `${variables.filtroTipoayuda} and ${variables.filtroClasificacion}`: `${variables.filtroTipoayuda} and ${variables.filtroInstalacionPortuaria}`;

      console.log(filtroCap, "filtroCap");

      uniqueValues({
          layer: variables.capaFilter,
          field: "Capitania",
          // sqlWhere: `${variables.capaFilter == variables.featureLayer2 ? `${variables.filtroTipoayuda} and ${variables.filtroClasificacion}`: `${variables.filtroTipoayuda} and ${variables.filtroInstalacionPortuaria}`}`,//Capitania = 1
          sqlWhere: filtroCap
      }).then(function(response) {
          // prints each unique value and the count of features containing that value
          var infos = response.uniqueValueInfos;
          console.log("infos",response, infos)
          infos.forEach(function(info) {
              console.log(dominios.domain.codedValues.filter(e => e.code == info.value))
              if (info.value != null) {
                  capitanias.push({label: dominios.domain.codedValues.filter(e => e.code == info.value)[0].name, id: info.value})                    
              }
          });
  
          console.log("capitanias21",capitanias)
  
          setCapitanias(capitanias);
      });
  
      uniqueValues({
        layer: variables.capaFilter,
        field: "Tipo",
        sqlWhere: variables.capaFilter == variables.featureLayer2 ? `${variables.filtroCapitania} and ${variables.filtroClasificacion}`: `${variables.filtroCapitania} and ${variables.filtroInstalacionPortuaria}`,//Capitania = 1
        }).then(function(response) {
            // prints each unique value and the count of features containing that value
            var infos = response.uniqueValueInfos;
            console.log("infos",response, infos)
            infos.forEach(function(info) {
                // console.log(dominios.domain.codedValues.filter(e => e.code == info.value))
                if (info.value != null) {
                  tipoayuda.push({label: info.value})                    
                }
            });
  
            // console.log("capitanias21",capitanias)
  
            setTipoayuda(tipoayuda);
        });
  
        let campo2 = variables.capaFilter.getField("Clasificacion");
  
        console.log(campo2, "campo2");
        if (campo2 != undefined) {
          uniqueValues({
            layer: variables.capaFilter,
            field: "Clasificacion",
            sqlWhere: `${variables.filtroCapitania} and ${variables.filtroTipoayuda}`,//Capitania = 1
            }).then(function(response) {
                // prints each unique value and the count of features containing that value
                var infos = response.uniqueValueInfos;
                console.log("infos",response, infos)
                infos.forEach(function(info) {
                    // console.log(dominios.domain.codedValues.filter(e => e.code == info.value))
                    if (info.value != null) {
                      clasificacion.push({label: info.value})                    
                    }
                });
      
                // console.log("capitanias21",capitanias)
      
                setClasificaciones(clasificacion);
          });
        }
        
        let campo3 = variables.capaFilter.getField("InstalacionPortuaria");
  
        if (campo3 != undefined) {
          uniqueValues({
            layer: variables.capaFilter,
            field: "InstalacionPortuaria",
            where: `${variables.filtroCapitania} and ${variables.filtroTipoayuda}`
          }).then(function(response) {
              // prints each unique value and the count of features containing that value
              var infos = response.uniqueValueInfos;
              console.log("infos",response, infos)
              infos.forEach(function(info) {
                  if (info.value != null) {
                    entidades.push({label: info.value})                    
                  }
              });
      
              // console.log("capitanias21",capitanias)
      
              setEntidades(entidades);
          });
        }
    } else if (grupo == "fondeo") {
      if (e.target.id.includes("Capitanía")) {
        variables.filtroCapitaniaFondeo = `Capitania = ${value.id}`
      } else if (e.target.id.includes("Nombre del área")) {
        variables.filtroNombreFondeo = `Observacion = '${value.label}'`
      }

      variables.capaFilterMap = variables.featureLayer5;

      let capitaniasFondeo = [];
      let nombresFondeo = [];

      let campo2 = variables.featureLayer5Filter.getField("Capitania");

      let dominios2 = campo2.toJSON();

      uniqueValues({
        layer: variables.featureLayer5Filter,
        field: "Capitania",
        sqlWhere: `${variables.filtroNombreFondeo}`
      }).then(function(response) {
              // prints each unique value and the count of features containing that value
        var infos = response.uniqueValueInfos;
        console.log("infosfondeo",response, infos)
        infos.forEach(function(info) {
          console.log(dominios2.domain.codedValues.filter(e => e.code == info.value))
          if (info.value != null) {
            capitaniasFondeo.push({label: dominios2.domain.codedValues.filter(e => e.code == info.value)[0].name, id: info.value})                    
          }
        });

        console.log("capitanias21",capitaniasFondeo)

        setCapitaniasFondeo(capitaniasFondeo);
      });

      uniqueValues({
        layer: variables.featureLayer5Filter,
        field: "Observacion",
        sqlWhere: `${variables.filtroCapitaniaFondeo}`
      }).then(function(response) {
              // prints each unique value and the count of features containing that value
        var infos = response.uniqueValueInfos;
        console.log("infos",response, infos)
        infos.forEach(function(info) {
            if (info.value != null) {
              nombresFondeo.push({label: info.value})                    
            }
        });
    
            // console.log("capitanias21",capitanias)
    
        setNombreFondeo(nombresFondeo);
      });

    } else if (grupo == "canal") {
      console.log(e, e.target.id, value, reason, details, document.activeElement.id, e.target.ownerDocument.activeElement, "valoress", typeof(value))

      if (document.activeElement.id.includes("Capitanía")) {
        variables.evento1 = e;
        if (value === null ) {
          variables.filtroCapitaniaCanal = "1=1";
        } else {
          variables.filtroCapitaniaCanal = `Capitania = ${value.id}`
        }
      } else if (document.activeElement.id.includes("Nombre")) {
        variables.evento2 = e;
        if (value === null) {
          variables.filtroNombreCanal = "1=1";
        } else {
          variables.filtroNombreCanal = `Nombre = '${value.label}'`
        }
      } else if (document.activeElement.id.includes("Categoria")) {
        if (value === null) {
          variables.filtroCategoriaCanal = "1=1";
        } else {
          variables.filtroCategoriaCanal = `Categoria = '${value.id}'`
        }
      }

      let compara = variables.evento1 === variables.evento2;

      console.log(variables.evento1, variables.evento2, "eventosyei", compara, typeof(variables.evento1), typeof(variables.evento2));

      variables.capaFilterMap = variables.featureLayer4;

      let capitaniasCanal = [];
      let nombresCanal = [];
      let categoriasCanal = [];

      let campo2 = variables.featureLayer4Filter.getField("Capitania");

      let dominios2 = campo2.toJSON();

      console.log("filtrosss", `${variables.filtroCapitaniaCanal}  AND ${variables.filtroNombreCanal} and ${variables.filtroCategoriaCanal}`)

      uniqueValues({
        layer: variables.featureLayer4Filter,
        field: "Capitania",
        sqlWhere: `${variables.filtroNombreCanal} and ${variables.filtroCategoriaCanal}`
      }).then(function(response) {
          // prints each unique value and the count of features containing that value
        var infos = response.uniqueValueInfos;
        console.log("infoscanal",response, infos)
        infos.forEach(function(info) {
          console.log(dominios2.domain.codedValues.filter(e => e.code == info.value))
          if (info.value != null) {
            capitaniasCanal.push({label: dominios2.domain.codedValues.filter(e => e.code == info.value)[0].name, id: info.value})                    
          }
        });

        console.log("capitanias21",capitaniasCanal)

        setCapitaniasCanal(capitaniasCanal);
      });

      uniqueValues({
        layer: variables.featureLayer4Filter,
        field: "Nombre",
        sqlWhere: `${variables.filtroCapitaniaCanal} and ${variables.filtroCategoriaCanal}`
      }).then(function(response) {
          // prints each unique value and the count of features containing that value
        var infos = response.uniqueValueInfos;
        console.log("infos",response, infos)
        infos.forEach(function(info) {
            if (info.value != null) {
              nombresCanal.push({label: info.value})                    
            }
        });

        // console.log("capitanias21",capitanias)

        setNombreCanal(nombresCanal);
      });

      let campo3 = variables.featureLayer4Filter.getField("Categoria");

      let dominios3 = campo3.toJSON();

      uniqueValues({
        layer: variables.featureLayer4Filter,
        field: "Categoria",
        sqlWhere: `${variables.filtroCapitaniaCanal} and ${variables.filtroNombreCanal}`
      }).then(function(response) {
          // prints each unique value and the count of features containing that value
        var infos = response.uniqueValueInfos;
        console.log("infos",response, infos)
        infos.forEach(function(info) {
          if (info.value != null) {
            categoriasCanal.push({label: dominios3.domain.codedValues.filter(e => e.code == info.value)[0].name, id: info.value})                    
          }
        });

        // console.log("capitanias21",capitanias)

        setCategoriasCanal(categoriasCanal);
      });



    }
    



  }  



    useEffect(
      () => {
        console.log("variables.featureLayer", variables.featureLayer);
        if(variables.featureLayer != null) {

          let listaopciones = [];

          // variables.featureLayer.when(function() {

          uniqueValues({
            layer: variables.featureLayer,
            field: variables.campos[0]
          }).then(function(response) {
              // prints each unique value and the count of features containing that value
              var infos = response.uniqueValueInfos;
              console.log("infosfondeo",response, infos)
              infos.forEach(function(info) {
                if (info.value != null) {
                  listaopciones.push({label: info.value})          
                }  
              });

              console.log("capitanias21", listaopciones)

              setOpciones(listaopciones);
          });

          // });
          
        }

      },
      []
    );


    return (
      <div>
        <h2>Filtros</h2>

        {
          grupos["capa1"].map((group,i) => {
            return <ComboBox key={i} titulo={group} opciones={opciones} change={ChangeOption} visible={ "block" } />
          },[])
        }       
        {/* <ComboBox titulo="Tipo de canal:"/>
        <ComboBox titulo="Capitanía de puerto:"/>
        <ComboBox titulo="Entidad:"/>
        <ComboBox titulo="Tipo de ayuda:"/>
        <ComboBox titulo="Clasificación:"/>
        <ComboBox titulo="Nombre del área:"/>
        <ComboBox titulo="Nombre:"/>
        <ComboBox titulo="Categoria:"/> */}
       
      </div>
    );
  };
  
  export default SelectComponent;

