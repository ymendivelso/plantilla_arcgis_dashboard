import React from "react";
import SelectComponent from "./filtros.jsx";
import ComboBox from "./select.jsx";
import Header from "./header.jsx";


const container = document.getElementById("app-container");
const header = document.getElementById("header");
ReactDOM.render(<SelectComponent />, container);
ReactDOM.render(<Header />, header);
// ReactDOM.render(<ComboBox />, container);