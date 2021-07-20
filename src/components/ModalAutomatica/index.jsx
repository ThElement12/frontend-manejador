import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Button, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { InventarioService } from '../../services/inventario.service';

export default class ModalAutomatica extends Component {
  state = {
    form: {
      codigoOrdenCompra: '',
      fechaOrden: '',
      montoTotal: ''
    },
    articulos: [],
    cantidadAux:'',
    dropdownOpen: false,
    inputList:[{codigoArticulo:'Articulo',cantidad:'',precioUnidad:'',precioOrden:''}]
  }



  toggle = () => {
    let open = this.state.dropdownOpen ? false : true
    this.setState({
      dropdownOpen: open
    });
  }
  hideModalAutomatica = this.props.hideModalOrden;
  articulos = this.props.articles
  getAllArticles() {
    var merged = this.props.articles.map(md => md.codigoArticulo);
    merged = [].concat(...merged);
    return merged


  }


  addOrden = () => {
    //Push a la db
    var newValue = this.state.form;
    newValue.codigoOrdenCompra = this.props.cantidad + 1
    newValue.articulos = this.state.inputList
    newValue.montoTotal = 0
    for(var i of newValue.articulos){
      console.log(Math.round(i.precioOrden * 100) / 100)
        newValue.montoTotal += Math.round(i.precioOrden * 100) / 100; 
    }
    console.log(newValue)
    const inventarioService = new InventarioService()
    inventarioService.registerOrden(newValue)
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


  addArticle = (e, index) => {
    
    let arr = this.state.inputList
    let art = this.findArticleByCode(e.currentTarget.textContent)

    arr.push({
      codigoArticulo:e.currentTarget.textContent,
      cantidad:this.state.cantidadAux,
      precio:art.precio
    })
    this.setState({articulos:arr})
  }

  handleInputChange = (e, index) => {
    const value  = e.currentTarget.textContent;
    const list = this.state.inputList
    let art = this.findArticleByCode(e.currentTarget.textContent)
    list[index]["codigoArticulo"] = value;
    list[index]["precioUnidad"] = Math.round(art.precio * 100) / 100;
    this.setState({inputList:list})
    console.log(this.state)
  };

  handleCantidad = (e, index) => {
    const value  = e.target.value;
    const list = this.state.inputList
    list[index]["cantidad"] = value;
    list[index]["precioOrden"] = value * Math.round(list[index]["precioUnidad"] * 100) / 100;
    this.setState({inputList:list})
    console.log(this.state)
  };


  handleRemoveClick = index => {
    const list = this.state.inputList
    list.splice(index, 1);
    this.setState({inputList:list})
  };

  handleAddClick = () => {
    const list = this.state.inputList
    list.push({codigoArticulo:'Articulo',cantidad:'',precio:''})
    this.setState({
      inputList: list
    });
  };

  findArticleByCode(code){
    
    for(var ind of this.props.articles){

      if(ind.codigoArticulo == code){
        return ind
      }

    }
    console.log("salio")
    return null
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
            <input className="form-control" type="date" name="fechaOrden" onChange={this.handleChange} />
          </FormGroup>

          <div className="text-center">
            <br />
            <h5>Componentes</h5>
            <br />
          </div>

          <div className="box">
          <FormGroup>

            {this.state.inputList.map( (x,i) => {
              return (
                <div className="row">

                <div className="col-6">
                  {/* <input className="form-control" type="text" name="cantidad" onChange={this.handleChange} /> */}
                

                  {/* {i < 1 && 
                  <Dropdown group isOpen={false} >
                    <DropdownToggle color="primary" caret>
                      {x.codigoArticulo}
                    </DropdownToggle>
                    <DropdownMenu >
                      {this.getAllArticles().map(
                        (article) => {
                          return (
                            <DropdownItem onClick={e => this.handleInputChange(e, i)} key={article}>{article}</DropdownItem>
                          );
                          
                        }
                      )}
                    </DropdownMenu>
  
                  </Dropdown>} */}

                  { 
                  <Dropdown  style={ i==0? {marginTop:0}:{marginTop:20} }  group isOpen={ i == this.state.inputList.length-1? this.state.dropdownOpen:false} toggle={this.toggle}>
                    <DropdownToggle color="primary" caret>
                      {x.codigoArticulo}
                    </DropdownToggle>
                    <DropdownMenu >
                      {this.getAllArticles().map(
                        (article) => {
                          return (
                            <DropdownItem onClick={e => this.handleInputChange(e, i)} key={article}>{article}</DropdownItem>
                          );
                          
                        }
                      )}
                    </DropdownMenu>
  
                  </Dropdown>}<br />
                  
                </div>
                <div className="col-4">
  
                  <input className="form-control" style={ i==0? {marginTop:0}:{marginTop:20} } placeholder="cantidad" type="number"value={x.cantidad} name="cantidad" onChange={e => this.handleCantidad(e, i)} />
                </div>
                <div className="col-2 " >
                <Row>

                
                
                
                {this.state.inputList.length !== 1 && <Button style={ i==0? {marginTop:0}:{marginTop:20} } onClick={() => this.handleRemoveClick(i)} color="danger">-</Button> }
                {this.state.inputList.length - 1 === i && <Button style={ i > 0? {marginTop:20}:{marginTop:0} }  onClick={this.handleAddClick} color="primary">+</Button>  }
                </Row>
                  
                </div>
              </div>
              )
            } )}

              {/* <div style={{ marginTop: 20 }}>{JSON.stringify(this.state.inputList)}</div> */}
          </FormGroup>
            </div>


        </ModalBody>
        <ModalFooter>
          <Button onClick={() => this.addOrden()} color="primary">Generar</Button>
          <Button onClick={() => this.hideModalAutomatica()} color="danger">Cancelar</Button>
        </ModalFooter>

      </Modal>
    )
  }
}
