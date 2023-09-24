import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Agregar1 from './componentes/Agregar_mal';
import Agregar from './componentes/Agregar';
import Leer from './componentes/Leer';
import Editar from './componentes/Editar';
import Menu from './Menu';
import './css/menu1.css';
import "./css/App.css";
import Eliminar from './componentes/Eliminar';
import Reporte from './componentes/Generar_reporte';
import Login from './componentes/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/Agregar1" element={Agregar1} />
        <Route path="/Leer" element={<Leer />} />
        <Route path="/Agregar" element={<Agregar />} />
        <Route path="/Editar" element={<Editar />} />
        <Route path="/Eliminar" element={<Eliminar />} />
        <Route path="/Reporte" element={<Reporte />} />
      </Routes>
    </Router>
  );
}

export default App;