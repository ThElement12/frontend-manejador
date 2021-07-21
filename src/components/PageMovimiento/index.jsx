import React, {Component}from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container } from 'reactstrap'
import { InventarioService } from '../../services/inventario.service';

import ModalMovimiento from '../ModalMovimiento';
import ModalAutomatica from  '../ModalAutomatica';

const inventarioService = new InventarioService()
export default class index extends Component {
    inventory = this.findAllMovimiento()
    articles = this.findAllArticles()
    orders = this.findAllOrdenes()
  
    state = {
      data: this.findAllMovimiento(),
      articles: this.findAllArticles(),
      modalMovimiento: false,
      modalOrden: false
    }
  
    findAllMovimiento() {
      let inv = []
      inventarioService.findAllMovimientos().then((Response) => {
        inv = Response.data;
        this.inventory = Response.data
  
        this.setState({ data: this.inventory })
  
        return inv
      });
      return inv
    }

    findAllOrdenes() {
      let inv = []
      inventarioService.findAllOrders().then((Response) => {
        inv = Response.data;
        this.orders = Response.data  
        return inv
      });
      return inv
    }
  
    findAllArticles(){
      let inv = []
      inventarioService.findAllArticles().then(
        (Response) => {
          inv = Response.data;
          this.articles = Response.data
          this.setState({articles:this.articles})
          console.log(this.state)
          return inv
        }
      );
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
                      <td>{inventory.fecha.slice(0, 10)}</td>
                    </tr>
                ).sort()}
              </tbody>
            </Table>
          </Container>
          <ModalMovimiento modalMovimiento={this.state.modalMovimiento} cantidad={this.inventory.length} hideModalMovimiento={this.hideModalMovimiento}/>
          <ModalAutomatica articles={this.articles} modalOrden={this.state.modalOrden} cantidad={this.orders.length} hideModalOrden={this.hideModalOrden}/>
        </>
      );
    }
}
