import React, { Component } from "react";
import axios from "axios";
import { UncontrolledAccordion, UncontrolledCollapse, Card, CardHeader, CardTitle, Table } from "reactstrap";
import "../css/App.css";

class Filtro extends Component {
  state = {
    selectedType: "obra_blanca",
    dataObraBlanca: [],
    dataObraNegra: [],
    dataObraGris: [],
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

  selectType = (type) => {
    this.setState((prevState) => ({
      selectedType: prevState.selectedType === type ? null : type,
    }));
    this.fetchData(type);
  };

  renderTable = (data) => {
    return (
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo de Material</th>
            <th>Tamaño</th>
            <th>Cantidad</th>
            <th>Unidad de Medida</th>
            <th>Comentarios</th>
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
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  renderAccordionItems = () => {
    const { dataObraBlanca, dataObraNegra, dataObraGris } = this.state;

    const accordionConfig = [
      {
        type: "obra_blanca",
        label: "Obra Blanca",
        data: dataObraBlanca,
      },
      {
        type: "obra_negra",
        label: "Obra Negra",
        data: dataObraNegra,
      },
      {
        type: "obra_gris",
        label: "Obra Gris",
        data: dataObraGris,
      },
    ];

    return accordionConfig.map(({ type, label, data }) => (
      <UncontrolledAccordion key={type}>
        <Card>
          <CardHeader id={`${type}-header`}>
            <CardTitle className="mb-0">
              <button
                className="accordion-toggle"
                onClick={() => this.selectType(type)}
                aria-controls={`${type}-content`}
                aria-expanded={type === this.state.selectedType}
              >
                {label}
              </button>
            </CardTitle>
          </CardHeader>
          <UncontrolledCollapse toggler={`#${type}-header`} isOpen={type === this.state.selectedType}>
            <div className="accordion-body" id={`${type}-content`}>
              {this.renderTable(data)}
            </div>
          </UncontrolledCollapse>
        </Card>
      </UncontrolledAccordion>
    ));
  };

  render() {
    return <div className="accordion">{this.renderAccordionItems()}</div>;
  }
}

export default Filtro;
