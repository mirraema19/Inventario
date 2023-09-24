import React from 'react';

import Filtro from './Filtro'
import Navbar from './Navbar';
import "../css/App.css";

function Leer() {
  return (
    <React.Fragment>
      <Navbar />
      <Filtro/> 
    </React.Fragment>
    
  );
}

export default Leer;
