import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container } from 'reactstrap'
import { InventarioService } from '../src/services/inventario.service';

import ModalMovimiento from './components/ModalMovimiento';
import ModalAutomatica from  './components/ModalAutomatica';

const inventarioService = new InventarioService()
class App extends React.Component {

  inventory = this.findAllMovimiento()

  state = {
    data: this.findAllMovimiento(),
    modalMovimiento: false,
    modalOrden: false
  }

  findAllMovimiento() {
    let inv = []
    inventarioService.findAllMovimientos().then((Response) => {
      inv = Response.data.data;
      this.inventory = Response.data

      this.setState({ data: this.inventory })
      console.log(this.state)
      return inv
    });
    return inv
  }
  showModalOrden = () => {
    this.setState({modalOrden : true})
  }
  hideModalOrden = () => {
    this.setState({modalOrden : false})
  }

  showModalMovimiento = () => {
    this.setState({ modalMovimiento: true })
  }
  hideModalMovimiento = () => {
    //Fetch a la db
    this.setState({ modalMovimiento: false })
  }
  render() {

    /* inventarioService.findAllMovimientos().then( (Response) => {
      this.inventory = Response.data.data;
      
      console.log(Response)
    } ); */

    return (
      <>
        <Container>

          <br />
          <div>
            <h3>XYZ  Computers Almacen</h3>
          </div>
          <br />
          <Button onClick={() => this.showModalMovimiento()} color="primary">Nuevo Movimiento</Button>-
          <Button onClick={() => this.showModalOrden()} color="warning">Generar Orden Automatica</Button>
          <br />
          <br />
          <Table bordered hover>
            <thead>
              <tr>
                <th>Codigo Movimiento</th>
                <th>Codigo Almacen</th>
                <th>Tipo de movimiento</th>
                <th>Codigo Articulo</th>
                <th>Cantidad</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(
                (inventory) =>
                  <tr>
                    <td>{inventory.codigoMovimiento}</td>
                    <td>{inventory.codigoAlmacen}</td>
                    <td>{inventory.tipoMovimiento}</td>
                    <td>{inventory.codigoArticulo}</td>
                    <td>{inventory.cantidad}</td>
                    <td>{inventory.fecha}</td>
                  </tr>
              ).sort()}
            </tbody>
          </Table>
        </Container>
        <ModalMovimiento modalMovimiento={this.state.modalMovimiento} cantidad={this.inventory.length} hideModalMovimiento={this.hideModalMovimiento}/>
        <ModalAutomatica modalOrden={this.state.modalOrden} hideModalOrden={this.hideModalOrden}/>
      </>
    );
  }
}


export default App;
