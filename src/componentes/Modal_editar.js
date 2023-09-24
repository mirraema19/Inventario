import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter } from "reactstrap";
import axios from 'axios';

class Modal_editar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalInsertar: false,
      form: {
        id: "",
        tipoMaterial: "",
        tamaño: "",
        cantidad: "",
        unidadMedida: "",
        comentarios: "",
        selectedTipoObra: "",
        tipoObra: "",
      },
      selectedItem: null,
      searchQuery: "",
      obraBlancaData: [],
      obraNegraData: [],
      obraGrisData: [],
      data: [],
      filteredData: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  generarOpcionesCantidad = () => {
    const opciones = [];
    for (let i = 0; i <= 100; i++) { // Puedes ajustar el rango según tus necesidades
      opciones.push(<option key={i} value={i}>{i}</option>);
    }
    return opciones;
  };


  insertar = () => {
    const { selectedItem, selectedTipoObra } = this.state;
    const tipoObra = selectedTipoObra.toLowerCase();
  
    if (selectedItem) {
      // Modificar los datos existentes
      const url = `http://localhost:4000/api/obra_${tipoObra}/${selectedItem.id}`;
      axios
        .put(url, selectedItem)
        .then((response) => {
          // Actualizar el estado data con los datos actualizados
          const updatedData = this.state.data.map((item) =>
            item.id === selectedItem.id ? selectedItem : item
          );
          this.setState({ modalInsertar: false, data: updatedData, selectedItem: null });
        })
        .catch((error) => {
          console.error("Error al modificar el material", error);
        });
    } else {
      // Agregar un nuevo material
      const url = `http://localhost:4000/api/obra_${tipoObra}`;
      axios
        .post(url, this.state.form)
        .then((response) => {
          const valorNuevo = { ...this.state.form, id: response.data.insertId };
          const lista = this.state.data;
          lista.push(valorNuevo);
          this.setState({ modalInsertar: false, data: lista, form: { ...this.state.form, id: "" } });
        })
        .catch((error) => {
          console.error("Error al agregar el material", error);
        });
    }
  };
  

  componentDidMount() {
    this.fetchObraBlancaData();
    this.fetchObraNegraData();
    this.fetchObraGrisData();
  }

  fetchObraBlancaData = () => {
    axios
      .get("http://localhost:4000/api/obra_blanca")
      .then((response) => {
        this.setState({ obraBlancaData: response.data });
      })
      .catch((error) => {
        console.error("Error al obtener los datos de Obra_blanca", error);
      });
  };

  fetchObraNegraData = () => {
    axios
      .get("http://localhost:4000/api/obra_negra")
      .then((response) => {
        this.setState({ obraNegraData: response.data });
      })
      .catch((error) => {
        console.error("Error al obtener los datos de Obra_negra", error);
      });
  };

  fetchObraGrisData = () => {
    axios
      .get("http://localhost:4000/api/obra_gris")
      .then((response) => {
        this.setState({ obraGrisData: response.data });
      })
      .catch((error) => {
        console.error("Error al obtener los datos de Obra_gris", error);
      });
  };
 
  
  seleccionarItem = (item) => {
    this.setState({ selectedItem: item, modalInsertar: true });
  };

  mostrarTodo = () => {
    this.setState({
      searchQuery: "",
      filteredData: [],
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false, selectedItem: null });
  };

  handleChange(e) {
    const { selectedItem } = this.state;
    const { name, value } = e.target;
  
    // Actualizar el estado del formulario
    if (selectedItem) {
      const updatedItem = { ...selectedItem, [name]: value };
      this.setState({ selectedItem: updatedItem });
    } else {
      const updatedForm = { ...this.state.form, [name]: value };
      this.setState({ form: updatedForm });
    }
  }

  handleSearch = (tipoObra) => {
    const url = `http://localhost:4000/api/obra_${tipoObra}`;
    axios
      .get(url)
      .then((response) => {
        this.setState({ filteredData: response.data, searchQuery: tipoObra });
      })
      .catch((error) => {
        console.error("Error al obtener los registros", error);
      });
  };
  

  handleTipoObraSelection = (tipoObra) => {
    this.setState({ selectedTipoObra: tipoObra }, () => {
      console.log("Tipo de obra seleccionado:", this.state.selectedTipoObra);
      this.handleSearch(tipoObra);
    });
  };
  
  render() {
    return (
      <>
        <br />
        <br />
        <br />
        <div>
          {/* Actualizamos los botones para llamar a la función handleTipoObraSelection */}
          <Button color="primary" onClick={() => this.handleTipoObraSelection("blanca")}>
          Obra Blanca
          </Button>{" "}
          <Button color="primary" onClick={() => this.handleTipoObraSelection("negra")}>
          Obra Negra
          </Button>{" "}
          <Button color="primary" onClick={() => this.handleTipoObraSelection("gris")}>
          Obra Gris
          </Button>{" "}
        </div>
        <br />
        <br />
        <Table>
          <thead>
            <tr>
              <th>Identificación</th>
              <th>Tipo de material</th>
              <th>Tamaño</th>
              <th>Cantidad</th>
              <th>Unidad de Medida</th>
              <th>Comentarios</th>
           
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.Tipo_de_material}</td>
                <td>{item.Tamaño}</td>
                <td>{item.Cantidad}</td>
                <td>{item.Unidad_de_medida}</td>
                <td>{item.Comentarios}</td>
                
                <td>
                  <Button color="warning" onClick={() => this.seleccionarItem(item)}>
                    Modificar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>{this.state.selectedItem ? "Modificar Material" : "Agregar Material"}</h3>
            </div>
          </ModalHeader>
          <ModalBody>
  <FormGroup>
    <label>Identificación:</label>
    <input
      className="form-control"
      readOnly
      type="text"
      value={
        this.state.selectedItem
          ? this.state.selectedItem.id
          : this.state.filteredData.length + 1
      }
    />
  </FormGroup>
  <FormGroup>
    <label>Tipo de Material:</label>
    <input
      className="form-control"
      name="tipoMaterial"
      type="text"
      onChange={this.handleChange}
      value={
        this.state.selectedItem
          ? this.state.selectedItem.tipoMaterial
          : this.state.form.tipoMaterial
      }
    />
  </FormGroup>
  <FormGroup>
    <label>Tamaño:</label>
    <input
      className="form-control"
      name="tamaño"
      type="text"
      onChange={this.handleChange}
      value={
        this.state.selectedItem ? this.state.selectedItem.tamaño : this.state.form.tamaño
      }
    />
  </FormGroup>
  <FormGroup>
    <label>Cantidad:</label>
    {/* Cambiar el input por el select */}
    <select
      className="form-control"
      name="cantidad"
      onChange={this.handleChange}
      value={
        this.state.selectedItem ? this.state.selectedItem.cantidad : this.state.form.cantidad
      }
    >
      {/* Llamamos a la función generarOpcionesCantidad para generar las opciones */}
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
      value={
        this.state.selectedItem
          ? this.state.selectedItem.unidadMedida
          : this.state.form.unidadMedida
      }
    />
  </FormGroup>
  <FormGroup>
    <label>Comentarios:</label>
    <textarea
      className="form-control"
      name="comentarios"
      onChange={this.handleChange}
      value={
        this.state.selectedItem
          ? this.state.selectedItem.comentarios
          : this.state.form.comentarios
      }
    />
  </FormGroup>
</ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={this.insertar}>
              {this.state.selectedItem ? "Modificar" : "Agregar"}
            </Button>
            <Button className="btn btn-danger" onClick={this.cerrarModalInsertar}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default Modal_editar;