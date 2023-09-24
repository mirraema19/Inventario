import React, { Component } from "react";
import axios from "axios";
import { Table, Button, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import swal from 'sweetalert';
import '../css/index.css';


class ModalEliminar extends Component {
  state = {
    selectedType: "obra_blanca",
    dataObraBlanca: [],
    dataObraNegra: [],
    dataObraGris: [],
    modalInsertar: false,
    form: {
      id: "",
      tipoMaterial: "",
      tamano: "",
      cantidad: 0,
      unidadMedida: "",
      comentarios: "",
    },
    selectedItem: null,
  };

  componentDidMount() {
    this.fetchData("obra_blanca");
  }

  fetchData = async (type) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/${type}`);
      const data = response.data;

      switch (type) {
        case "obra_blanca":
          this.setState({ dataObraBlanca: data });
          break;
        case "obra_negra":
          this.setState({ dataObraNegra: data });
          break;
        case "obra_gris":
          this.setState({ dataObraGris: data });
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };

  insertar = async () => {
    const { selectedItem, selectedType } = this.state;
    try {
      if (selectedItem) {
        const { tipoMaterial, tamano, cantidad, unidadMedida, comentarios } = selectedItem;
        const updatedItem = { tipoMaterial, tamano, cantidad, unidadMedida, comentarios };
        await axios.put(`http://localhost:4000/api/${selectedType}/${selectedItem.id}`, updatedItem);
        const updatedData = this.state[selectedType].map((item) =>
          item.id === selectedItem.id ? { ...item, ...updatedItem } : item
        );
        this.setState({
          modalInsertar: false,
          [selectedType]: updatedData,
          selectedItem: null,
        });
      } else {
        const { form } = this.state;
        const response = await axios.post(`http://localhost:4000/api/${selectedType}`, form);
        const newItem = response.data;
        const newData = [...this.state[selectedType], newItem];
        this.setState({ modalInsertar: false, [selectedType]: newData });
      }
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = (e) => {
    const { selectedItem } = this.state;
    if (selectedItem) {
      this.setState({
        selectedItem: {
          ...selectedItem,
          [e.target.name]: e.target.value,
        },
      });
    } else {
      this.setState({
        form: {
          ...this.state.form,
          [e.target.name]: e.target.value,
        },
      });
    }
  };

  selectType = (type) => {
    this.setState({ selectedType: type });
    this.fetchData(type);
  };

  seleccionarItem = (item) => {
    this.setState({ selectedItem: item, modalInsertar: true });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false, selectedItem: null });
  };

  eliminarItem = async (item) => {
    const { selectedType } = this.state;

    swal({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar la información eliminada.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:4000/api/${selectedType}/${item.id}`)
          .then(() => {
            this.fetchData(selectedType); // Obtener los nuevos datos actualizados
            swal("El material ha sido eliminado.", {
              icon: "success",
            });
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        swal("El material no ha sido eliminado.");
      }
    });
  };

  render() {
    const { selectedType, dataObraBlanca, dataObraNegra, dataObraGris, selectedItem, modalInsertar } = this.state;

    let data;
    switch (selectedType) {
      case "obra_blanca":
        data = dataObraBlanca;
        break;
      case "obra_negra":
        data = dataObraNegra;
        break;
      case "obra_gris":
        data = dataObraGris;
        break;
      default:
        data = [];
        break;
    }

    return (
      <>
        <br />
        <br />
        <br />
        <div>
          <Button  className="boton5"
            color="primary"
            onClick={() => this.selectType("obra_blanca")}
            active={selectedType === "obra_blanca"}
          >
            Obra Blanca
          </Button>
          <Button className="boton5"
            color="primary"
            onClick={() => this.selectType("obra_negra")}
            active={selectedType === "obra_negra"}
          >
            Obra Negra
          </Button>
          <Button className="boton5"
            color="primary"
            onClick={() => this.selectType("obra_gris")}
            active={selectedType === "obra_gris"}
          >
            Obra Gris
          </Button>
        </div>
        <br />
        <br />
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Tipo de Material</th>
              <th>Tamaño</th>
              <th>Cantidad</th>
              <th>Unidad de Medida</th>
              <th>Comentarios</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.Tipo_de_material}</td>
                <td>{item.Tamaño}</td>
                <td>{item.Cantidad}</td>
                <td>{item.Unidad_de_medida}</td>
                <td>{item.Comentarios}</td>
                <td>
                  <div className="delete-button-container">
                    <button className="delete-button" onClick={() => this.eliminarItem(item)}>
                      <svg className="delete-svgIcon" viewBox="0 0 448 512">
                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal isOpen={modalInsertar}>
          <ModalHeader>
            <div>
              <h3>{selectedItem ? "Modificar Material" : "Agregar Material"}</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>ID:</label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={selectedItem ? selectedItem.id : ""}
              />
            </FormGroup>
            <FormGroup>
              <label>Tipo de Material:</label>
              <input
                className="form-control"
                name="tipoMaterial"
                type="text"
                value={selectedItem ? selectedItem.Tipo_de_material : ""}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Tamaño:</label>
              <input
                className="form-control"
                name="tamano"
                type="text"
                value={selectedItem ? selectedItem.Tamaño : ""}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Cantidad:</label>
              <input
                className="form-control"
                name="cantidad"
                type="number"
                value={selectedItem ? selectedItem.Cantidad : 0}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Unidad de Medida:</label>
              <input
                className="form-control"
                name="unidadMedida"
                type="text"
                value={selectedItem ? selectedItem.Unidad_de_medida : ""}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Comentarios:</label>
              <textarea
                className="form-control"
                name="comentarios"
                value={selectedItem ? selectedItem.Comentarios : ""}
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.insertar}>
              {selectedItem ? "Modificar" : "Agregar"}
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

export default ModalEliminar;
