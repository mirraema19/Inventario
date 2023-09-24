import React, { useState } from 'react'; // Importa useState para utilizar el estado
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function BarraBusqueda() { // El nombre del componente debe comenzar con mayúscula

  const [busqueda, setBusqueda] = useState(''); // Define el estado para almacenar la búsqueda

  const onChange = (event) => {
    setBusqueda(event.target.value); // Actualiza el estado con el valor del campo de búsqueda
  };

  const onClear = () => {
    setBusqueda(''); // Limpia el campo de búsqueda
  };

  return (
    <>
    <div className="barraBusqueda">
      <input
        type="text"
        placeholder="Buscar"
        className="textField"
        name="busqueda"
        value={busqueda} // Usa el estado 'busqueda' en lugar de 'this.state.busqueda'
        onChange={onChange}
      />
      <button type="button" className="btnBuscar" onClick={onClear}>
        {" "}
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
    
    </>
  );
}

export default BarraBusqueda; // Exporta el componente con la primera letra en mayúscula
