import React, { Component } from 'react'
import { InventarioService } from '../../services/inventario.service';


import Orden from '../Orden';

const ordenes = new InventarioService()
export default class PaginaOrdenes extends Component {
  inventory = this.findAllOrders()
  orders = []

  state = {
    data: this.findAllOrders(),
  }

  findAllOrders() {
    let inv = []
    ordenes.findAllOrders().then((Response) => {
      inv = Response.data;
      this.inventory = Response.data
      this.setState({ data: this.inventory })
      return inv
    });
    return inv
  }
  render() {
    return (
      <div>
        {
          this.state.data.map((orden) =>
            <div>
              <Orden orden={orden} />
            </div>
          )
        }

      </div>
    )
  }
}
