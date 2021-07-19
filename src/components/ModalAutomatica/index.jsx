import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Button } from 'reactstrap';


export default class ModalAutomatica extends Component {
  state = {
    form: {
      fecha: '',
      articulos: []
    }
  }
  hideModalAutomatica = this.props.hideModalOrden;

  addOrden = () => {
    //Push a la db
    var newValue = this.state.form;
    newValue.codigoMovimiento = this.props.cantidad + 1
    console.log(newValue)
    this.hideModalAutomatica();
  }
  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });
  }
  render() {
    const inputList = [];
    return (
      <Modal isOpen={this.props.modalOrden}>
        <ModalHeader>
          <div>
            <h3>Nueva Orden Automatica</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Codigo Orden</label>
            <input className="form-control" readOnly type="text" value={this.props.cantidad + 1} />
          </FormGroup>

          <FormGroup>
            <label>Fecha requerida</label>
            <input className="form-control" type="text" name="codigoAlmacen" onChange={this.handleChange} />
          </FormGroup>

          <FormGroup>
            <label>Tipo de movimiento</label>
            <input className="form-control" type="text" name="tipoMovimiento" onChange={this.handleChange} />
          </FormGroup>

          <FormGroup>
            <label>Codigo Articulo</label>
            <input className="form-control" type="text" name="codigoArticulo" onChange={this.handleChange} />
          </FormGroup>

          <FormGroup>
            <label>Cantidad</label>
            <input className="form-control" type="text" name="cantidad" onChange={this.handleChange} />
          </FormGroup>

          <FormGroup>
            <label>Fecha</label>
            <input className="form-control" type="text" name="fecha" onChange={this.handleChange} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => this.addOrden()} color="primary">Insertar</Button>
          <Button onClick={() => this.hideModalAutomatica()} color="danger">Cancelar</Button>
        </ModalFooter>

      </Modal>
    )
  }
}
