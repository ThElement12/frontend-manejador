import axios from "axios";

export class InventarioService {
    // TODO: mi loco usa esta clase como servicio pa todas las entidades pa no complicarnos, gracias tqmnohomo
    url = 'http://localhost:8082/'

    registerMovimiento(movimiento){
        return axios.post(this.url + 'movimiento', movimiento);
    }
    
    registerOrden(orden){
        return axios.post(this.url+'orden',orden)
    }
    
    findAllMovimientos(){
        return axios.get(this.url+'movimiento');
    }

    findAllArticles(){
        return axios.get(this.url+'articulo');
    }
    findAllOrders(){
        return axios.get(this.url+"orden")
    }

    
}