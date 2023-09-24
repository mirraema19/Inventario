import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalHeader, ModalBody, FormGroup, ModalFooter, Button } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import "../css/App.css";

class AgregarMaterial extends React.Component {
  state = {
    data: [],
    modalInsertar: false,
    form: {
      id: "",
      tipoMaterial: "",
      tamaño: "",
      cantidad: 1, // Por defecto, la cantidad será 1
      unidadMedida: "",
      comentarios: "",
      tipoObra: "",
    },
  };

  insertar = () => {
    const nuevoMaterial = { ...this.state.form };
    const tipoObra = nuevoMaterial.tipoObra;
    delete nuevoMaterial.tipoObra;

    if (this.state.data.length > 0) {
      // Obtener el máximo ID de los materiales existentes
      const maxID = this.state.data.reduce((max, material) => {
        return material.id > max ? material.id : max;
      }, 0);

      // Asignar el nuevo ID como maxID + 1
      nuevoMaterial.id = maxID + 1;
    } else {
      // Si no hay materiales en la tabla, asignar ID inicial como 1
      nuevoMaterial.id = 1;
    }

    // Validar que la cantidad sea un número válido y mayor o igual a 1
    const cantidad = nuevoMaterial.cantidad;
    if (cantidad < 1) {
      Swal.fire({
        title: "Error",
        text: "La cantidad no puede ser menor que 1",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (nuevoMaterial.tamaño.trim() === "") {
      nuevoMaterial.tamaño = "NA";
    }

    // Verificar si ya existe un material con los mismos campos (excepto el ID)
    const existingMaterial = this.state.data.find((material) => {
      return (
        material.Tipo_de_material === nuevoMaterial.tipoMaterial &&
        material.Tamaño === nuevoMaterial.tamaño &&
        material.Unidad_de_medida === nuevoMaterial.unidadMedida &&
        material.Tipo_de_obra === nuevoMaterial.tipoObra
      );
    });

    if (existingMaterial) {
      // Si el material existe, sumar la cantidad ingresada a la cantidad existente
      existingMaterial.Cantidad += cantidad;

      // Actualizar el material existente en la lista
      axios
        .put(`http://localhost:4000/api/${tipoObra}/${existingMaterial.id}`, existingMaterial)
        .then((response) => {
          Swal.fire({
            title: "El material se actualizó con éxito",
            text: response.data.message,
            icon: "success",
            confirmButtonText: "OK",
          });
          this.obtenerDatos();
          this.setState({
            modalInsertar: false,
            form: {
              id: "",
              tipoMaterial: "",
              tamaño: "",
              cantidad: 1,
              unidadMedida: "",
              comentarios: "",
              tipoObra: "",
            },
          });
        })
        .catch((error) => {
          console.error("Error al actualizar el material", error);
        });
    } else {
      // Si el material no existe, agregarlo como un nuevo material
      let url;

      switch (tipoObra) {
        case "obra negra":
          url = "http://localhost:4000/api/obra_negra";
          break;
        case "obra blanca":
          url = "http://localhost:4000/api/obra_blanca";
          break;
        case "obra gris":
          url = "http://localhost:4000/api/obra_gris";
          break;
        default:
          console.error("Tipo de obra no válido");
          return;
      }

      // Agregar el nuevo material a la base de datos
      axios
        .post(url, nuevoMaterial)
        .then((response) => {
          Swal.fire({
            title: "El material se agregó con éxito",
            text: response.data.message,
            icon: "success",
            confirmButtonText: "OK",
          });
          this.obtenerDatos();
          this.setState({
            modalInsertar: false,
            form: {
              id: "",
              tipoMaterial: "",
              tamaño: "",
              cantidad: 1,
              unidadMedida: "",
              comentarios: "",
              tipoObra: "",
            },
          });
        })
        .catch((error) => {
          console.error("Error al agregar el material", error);
        });
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "tamaño" && value === "" ? "NA" : value;

    this.setState({
      form: {
        ...this.state.form,
        [name]: updatedValue,
      },
    });
  };

  obtenerDatos = () => {
    axios
      .get("http://localhost:4000/api/obra_blanca")
      .then((response) => {
        const dataBlanca = response.data;
        axios
          .get("http://localhost:4000/api/obra_negra")
          .then((response) => {
            const dataNegra = response.data;
            axios
              .get("http://localhost:4000/api/obra_gris")
              .then((response) => {
                const dataGris = response.data;
                const allData = [...dataBlanca, ...dataNegra, ...dataGris];

                // Ordenar los datos por ID en orden ascendente
                allData.sort((a, b) => a.id - b.id);

                this.setState({
                  data: allData,
                });
              })
              .catch((error) => {
                console.error("Error al obtener los datos de obra_gris", error);
              });
          })
          .catch((error) => {
            console.error("Error al obtener los datos de obra_negra", error);
          });
      })
      .catch((error) => {
        console.error("Error al obtener los datos de obra_blanca", error);
      });
  };

  componentDidMount() {
    this.obtenerDatos();
  }

  render() {
    return (
      <>
        {/* Render the form directly without using a Modal */}
        <div>
          <h3>Insertar Material</h3>
          <FormGroup>
            <label>ID:</label>
            <input className="form-control" readOnly type="text" value={this.state.form.id} />
          </FormGroup>
          <FormGroup>
            <label>Tipo de Material:</label>
            <input
              className="form-control"
              name="tipoMaterial"
              type="text"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Tamaño:</label>
            <input
              className="form-control"
              name="tamaño"
              type="text"
              onChange={this.handleChange}
              onBlur={this.handleTamañoBlur}
            />
          </FormGroup>
          <FormGroup>
            <label>Cantidad:</label>
            <select
              className="form-control"
              name="cantidad"
              onChange={this.handleChange}
              value={this.state.form.cantidad}
            >
              {this.generarOpcionesCantidad()}
            </select>
          </FormGroup>
          <FormGroup>
            <label>Unidad de Medida:</label>
            <input
              className="form-control"
              name="unidadMedida"
              type="text"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Comentarios:</label>
            <textarea
              className="form-control"
              name="comentarios"
              onChange={this.handleChange}
              value={this.state.form.comentarios}
            />
          </FormGroup>
          <FormGroup>
            <label>Tipo de Obra:</label>
            <select className="form-control" name="tipoObra" onChange={this.handleChange}>
              <option value="">Seleccione una opción</option>
              <option value="obra negra">Obra Negra</option>
              <option value="obra blanca">Obra Blanca</option>
              <option value="obra gris">Obra Gris</option>
            </select>
          </FormGroup>
          <Button color="primary" onClick={this.insertar}>
            Agregar
          </Button>
        </div>
      </>
    );
  }

  generarOpcionesCantidad = () => {
    const opciones = [];
    for (let i = 1; i <= 100; i++) {
      opciones.push(<option key={i} value={i}>{i}</option>);
    }
    return opciones;
  };
}

export default AgregarMaterial;