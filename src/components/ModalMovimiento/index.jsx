import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, Form, ModalFooter, FormGroup, Button,Dropdown, DropdownToggle, DropdownMenu, DropdownItem  } from 'reactstrap';



export default class ModalMovimiento extends Component {
  state = {
    form: {
      codigoMovimiento: '',
      codigoAlmacen: '',
      tipoMovimiento: 'ENTRADA',
      codigoArticulo: '',
      cantidad: '',
      fecha: ''
    },
    dropdownOpen: false
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

  handleInputChange = (e) => {
    const value  = e.currentTarget.textContent;
    const formN = this.state.form
    formN.tipoMovimiento = value
    this.setState({form:formN})
    
  };

  toggle = () => {
    let open = this.state.dropdownOpen ? false : true
    this.setState({
      dropdownOpen: open
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
            
              <br />
              
            <Dropdown  group isOpen={this.state.dropdownOpen} toggle={this.toggle} >
                    <DropdownToggle color="primary" caret>
                      {this.state.form.tipoMovimiento}
                    </DropdownToggle>
                    <DropdownMenu >
                      
                    <DropdownItem onClick={e => this.handleInputChange(e)} >ENTRADA</DropdownItem>
                    <DropdownItem onClick={e => this.handleInputChange(e)} >SALIDA</DropdownItem>
                    </DropdownMenu>
  
                  </Dropdown>
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
