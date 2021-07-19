import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, DropdownMenu, DropdownItem, DropdownToggle, Dropdown } from 'reactstrap'
import {InventarioService} from '../src/services/inventario.service'



const inventarioService = new InventarioService()
class App extends React.Component {

  
  fecha = "27/18/2021"
  inventory = this.findAllMovimiento()
    
  state = {
    data:this.findAllMovimiento(),
    formMovimiento:{
      codigoMovimiento:'',
      codigoAlmacen:'',
      tipoMovimiento:'',
      codigoArticulo:'',
      cantidad:'',
      fecha:''
    },
    modalMovimiento: false
  }



  findAllMovimiento(){
    let inv = []
    inventarioService.findAllMovimientos().then( (Response) => {
      inv = Response.data.data;
      this.inventory = Response.data.data

      this.setState({data:this.inventory})
      console.log(this.state)
      return inv
    } );
    return inv
  }

  handleChange=e=>{
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]:e.target.value,
      }
    });
  }

  showModalMovimiento=()=> {
    this.setState({modalMovimiento:true})
  }
  hideModalMovimiento=()=> {
    this.setState({modalMovimiento:false})
  }

  addMoviment=()=>{
    console.log("Hola")
    var newValue={...this.state.form};
    console.log(newValue)
    newValue.codigoMovimiento = this.inventory.length+1
    var lista = this.state.data;
    lista.push(newValue);
    console.log(lista);
    this.setState({data:lista,modalMovimiento:false})

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
          <Button onClick={()=>this.showModalMovimiento()} color="primary">Nuevo Movimiento</Button>-
          <Button color="danger">Nuevo Producto</Button>-
          <Button color="warning">Generar Orden Automatica</Button>
          <br />
          <br />
          <Table  bordered hover>
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

        <Modal isOpen={this.state.modalMovimiento}>
          <ModalHeader>
            <div>
              <h3>Nuevo Movimiento</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Codigo Movimiento</label>
              <input className="form-control" readOnly type="text" value={this.inventory.length + 1}  />
            </FormGroup>

            <FormGroup>
              <label>Codigo Almacen</label>
              <input className="form-control" type="text" name="codigoAlmacen" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Tipo de movimiento</label>
              <input className="form-control" type="text" name="tipoMovimiento" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Codigo Articulo</label>
              <input className="form-control" type="text" name="codigoArticulo" onChange={this.handleChange}/>
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
            <Button onClick={()=>this.addMoviment()} color="primary">Insertar</Button>
            <Button onClick={()=>this.hideModalMovimiento()} color="danger">Cancelar</Button>
          </ModalFooter>

        </Modal>

      </>
    );
  }
}


export default App;
