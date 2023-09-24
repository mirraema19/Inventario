// Navbar.js
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Swal from "sweetalert2";
import MiImagen from "../img/logo.png";
import "../css/main.css";
import "../css/boton2.css";


const Navbar = () => {
  const navRef = useRef();


  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    obraBlanca: false,
    obraGris: false,
    obraNegra: false,
    robadas: false,
  });

  const handleCloseModal = () => {
    setSelectedOptions({
      obraBlanca: false,
      obraGris: false,
      obraNegra: false,
      robadas: false,
    });
    setShowModal(false);
  };

  const handleDownloadClick = async () => {
    const { obraBlanca, obraGris, obraNegra, robadas } = selectedOptions;

    // Use SweetAlert2 for download confirmation
    const result = await Swal.fire({
      title: "Confirmar descarga",
      text: "¿Deseas descargar los archivos seleccionados?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Descargar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      // Helper function to generate PDF for obra blanca
      const generateObraBlancaPDF = (data) => {
        const doc = new jsPDF();
        doc.text("Obra Blanca PDF", 10, 10);
        doc.autoTable({
          startY: 20,
          head: [
            ["Tipo de Material", "Tamaño", "Cantidad", "Unidad de Medida", "Comentarios"],
          ],
          body: data.map((item) => [
            item.Tipo_de_material,
            item.Tamaño,
            item.Cantidad,
            item.Unidad_de_medida,
            item.Comentarios,
          ]),
        });
        doc.save("Obra_blanca.pdf");
      };

      // Helper function to generate PDF for obra gris
      const generateObraGrisPDF = (data) => {
        const doc = new jsPDF();
        doc.text("Obra Gris PDF", 10, 10);
        doc.autoTable({
          startY: 20,
          head: [
            ["Tipo de Material", "Tamaño", "Cantidad", "Unidad de Medida", "Comentarios"],
          ],
          body: data.map((item) => [
            item.Tipo_de_material,
            item.Tamaño,
            item.Cantidad,
            item.Unidad_de_medida,
            item.Comentarios,
          ]),
        });
        doc.save("Obra_gris.pdf");
      };

      // Helper function to generate PDF for obra negra
      const generateObraNegraPDF = (data) => {
        const doc = new jsPDF();
        doc.text("Obra Negra PDF", 10, 10);
        doc.autoTable({
          startY: 20,
          head: [
            ["Tipo de Material", "Tamaño", "Cantidad", "Unidad de Medida", "Comentarios"],
          ],
          body: data.map((item) => [
            item.Tipo_de_material,
            item.Tamaño,
            item.Cantidad,
            item.Unidad_de_medida,
            item.Comentarios,
          ]),
        });
        doc.save("Obra_negra.pdf");
      };

      // Helper function to generate PDF for stolen materials
      const generateRobadasPDF = (data) => {
        const stolenMaterials = data.filter((item) =>
          item.Comentarios && item.Comentarios.includes("ROBADO")
        );
        if (stolenMaterials.length > 0) {
          const doc = new jsPDF();
          doc.text("Materiales Robados ", 10, 10);

          const tableData = stolenMaterials.map((item) => [
           
            item.Tipo_de_material,
            item.Tamaño,
            item.Cantidad,
            item.Unidad_de_medida,
            item.Comentarios,
            item.Tipo_de_obra, 
          ]);

          doc.autoTable({
            startY: 20,
            head: [
              [
                
                "Tipo de Material",
                "Tamaño",
                "Cantidad",
                "Unidad de Medida",
                "Comentarios",
                "Tipo de Obra",
              ],
            ],
            body: tableData,
          });
          doc.save("Materiales_robados.pdf");
        } else {
          alert("No se encontraron materiales robados.");
        }
      };

      if (obraBlanca) {
        fetch("http://localhost:4000/api/obra_blanca")
          .then((response) => response.json())
          .then((data) => {
            generateObraBlancaPDF(data);
          })
          .catch((error) => {
            console.error("Error fetching data for obra blanca", error);
          });
      }

      if (obraGris) {
        fetch("http://localhost:4000/api/obra_gris")
          .then((response) => response.json())
          .then((data) => {
            generateObraGrisPDF(data);
          })
          .catch((error) => {
            console.error("Error fetching data for obra gris", error);
          });
      }

      if (obraNegra) {
        fetch("http://localhost:4000/api/obra_negra")
          .then((response) => response.json())
          .then((data) => {
            generateObraNegraPDF(data);
          })
          .catch((error) => {
            console.error("Error fetching data for obra negra", error);
          });
      }

      if (robadas) {
        fetch("http://localhost:4000/api/all_materials") // Obtener todos los materiales de las tres obras
          .then((response) => response.json())
          .then((data) => {
            generateRobadasPDF(data); // Pasar el objeto data que contiene todas las obras
          })
          .catch((error) => {
            console.error("Error fetching data for stolen materials", error);
          });
      }
    }
  };
 

  return (
    <header>
      <img src={MiImagen} alt="Descripción de la imagen" style={{ width: "250px", height: "75px" }} />
      <nav ref={navRef}>
        <Link to="/Menu">Home</Link>
        <Link to="/Agregar">Agregar</Link>
        <Link to="/Leer">Leer</Link>
        <Link to="/Editar">Modificar</Link>
        <Link to="/Eliminar">Eliminar</Link>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
        
        </button>
        <button className="numero11" type="" onClick={() => setShowModal(true)}>imprimir lista</button>
        
      </nav>
    

      {/* Modal */}
      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Selecciona el tipo de descarga</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  <div className="accordion-item">
    <div
      className="accordion-header"
      onClick={() =>
        setSelectedOptions((prevOptions) => ({
          ...prevOptions,
          obraBlanca: !prevOptions.obraBlanca,
        }))
      }
    >
      <input
        type="checkbox"
        id="obraBlanca"
        checked={selectedOptions.obraBlanca}
        readOnly
      />
      <label htmlFor="obraBlanca">Obra blanca</label>
    </div>
    {selectedOptions.obraBlanca && (
      <div className="accordion-content">
        {/* Add any additional details for obraBlanca here if needed */}
      </div>
    )}
  </div>

  <div className="accordion-item">
    <div
      className="accordion-header"
      onClick={() =>
        setSelectedOptions((prevOptions) => ({
          ...prevOptions,
          obraGris: !prevOptions.obraGris,
        }))
      }
    >
      <input
        type="checkbox"
        id="obraGris"
        checked={selectedOptions.obraGris}
        readOnly
      />
      <label htmlFor="obraGris">Obra gris</label>
    </div>
    {selectedOptions.obraGris && (
      <div className="accordion-content">
        {/* Add any additional details for obraGris here if needed */}
      </div>
    )}
  </div>

  <div className="accordion-item">
    <div
      className="accordion-header"
      onClick={() =>
        setSelectedOptions((prevOptions) => ({
          ...prevOptions,
          obraNegra: !prevOptions.obraNegra,
        }))
      }
    >
      <input
        type="checkbox"
        id="obraNegra"
        checked={selectedOptions.obraNegra}
        readOnly
      />
      <label htmlFor="obraNegra">Obra negra</label>
    </div>
    {selectedOptions.obraNegra && (
      <div className="accordion-content">
        {/* Add any additional details for obraNegra here if needed */}
      </div>
    )}
  </div>

  <div className="accordion-item">
    <div
      className="accordion-header"
      onClick={() =>
        setSelectedOptions((prevOptions) => ({
          ...prevOptions,
          robadas: !prevOptions.robadas,
        }))
      }
    >
      <input
        type="checkbox"
        id="robadas"
        checked={selectedOptions.robadas}
        readOnly
      />
      <label htmlFor="robadas">Robadas</label>
    </div>
    {selectedOptions.robadas && (
      <div className="accordion-content">
        {/* Add any additional details for robadas here if needed */}
      </div>
    )}
  </div>
</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <button onClick={handleDownloadClick} class="download-button">
  <div class="docs"><svg class="css-i6dzq1" stroke-linejoin="round" stroke-linecap="round" fill="none" stroke-width="2" stroke="currentColor" height="20" width="20" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line y2="13" x2="8" y1="13" x1="16"></line><line y2="17" x2="8" y1="17" x1="16"></line><polyline points="10 9 9 9 8 9"></polyline></svg> Docs</div>
  <div class="download">
    <svg class="css-i6dzq1" stroke-linejoin="round" stroke-linecap="round" fill="none" stroke-width="2" stroke="currentColor" height="24" width="24" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line y2="3" x2="12" y1="15" x1="12"></line></svg>
  </div>
</button>
        </Modal.Footer>
      </Modal>
   
    </header>
  );
};

export default Navbar;
