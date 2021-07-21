import React, { Component } from 'react'

import {Container, Row, Col} from 'reactstrap';

/**const orden_compra = new Schema({
    codigoOrdenCompra: { 
        type: String, 
        unique:true 
    },
    codigoSuplidor: Number,
    fechaOrden: Date,
    articulos: [{
        codigoArticulo: String,
        cantidadOrdenada: Number,
        precioCompra: Number
    }]
});*/
export default class index extends Component {
    
    state = {
        order: this.props.orden
    }
    
    render() {

        return (
            <Container>
                <Row>
                    <Col>
                    <h1>
                        Codigo Orden: {this.props.orden.codigoOrdenCompra}
                    </h1>
                    </Col>
                    <Col>
                        Codigo Suplidor: {this.props.orden.codigoSuplidor}
                    </Col>
                    <Col>
                        Fecha: {this.props.orden.fechaOrden}
                    </Col>
                </Row>
                <Row>
                    {this.props.orden.articulos.map(
                        (articulo) =>
                        <Row>
                            <Col>
                                Codigo Articulo: {articulo.codigoArticulo}
                            </Col>
                            <Col>
                                Cantidad Ordenada: {articulo.cantidadOrdenada}
                            </Col>
                            <Col>
                                Precio Compra: {articulo.precioCompra}
                            </Col>
                        </Row>
                    )}
                </Row>   
            </Container>
        )
    }
}
