import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, Form, ModalFooter, FormGroup, Button } from 'reactstrap';


export default class ModalMovimiento extends Component {
  state = {
    form: {
      codigoMovimiento: '',
      codigoAlmacen: '',
      tipoMovimiento: '',
      codigoArticulo: '',
      cantidad: '',
      fecha: ''
    }
  }
  hideModalMovimiento = this.props.hideModalMovimiento;

  addMoviment = () => {
    //Push a la db
    console.log("Hola")
    var newValue = this.state.form;
    newValue.codigoMovimiento = this.props.cantidad + 1

    console.log(newValue)
    this.hideModalMovimiento();
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
    return (
      <Modal isOpen={this.props.modalMovimiento}>
          <ModalHeader>
            <div>
              <h3>Nuevo Movimiento</h3>
            </div>
          </ModalHeader>

          <ModalBody>
          <Form onSubmit={this.addMoviment}>
            <FormGroup>
              <label>Codigo Movimiento</label>
              <input className="form-control" readOnly type="text" value={this.props.cantidad + 1} required />
            </FormGroup>

            <FormGroup>
              <label>Codigo Almacen</label>
              <input className="form-control" type="text" name="codigoAlmacen" onChange={this.handleChange} required />
            </FormGroup>

            <FormGroup>
              <label>Tipo de movimiento</label>
              <input className="form-control" type="text" name="tipoMovimiento" onChange={this.handleChange} required />
            </FormGroup>

            <FormGroup>
              <label>Codigo Articulo</label>
              <input className="form-control" type="text" name="codigoArticulo" onChange={this.handleChange} required />
            </FormGroup>

            <FormGroup>
              <label>Cantidad</label>
              <input className="form-control" type="number" min="1" name="cantidad" onChange={this.handleChange} required />
            </FormGroup>

            <FormGroup>
              <label>Fecha</label>
              <input className="form-control" type="date" name="fecha" onChange={this.handleChange} required />
            </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary">Insertar</Button>
            <Button onClick={() => this.hideModalMovimiento()} color="danger">Cancelar</Button>
          </ModalFooter>

      </Modal>
    )
  }
}
