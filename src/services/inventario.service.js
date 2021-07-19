import axios from "axios";

export class InventarioService {
    // TODO: mi loco usa esta clase como servicio pa todas las entidades pa no complicarnos, gracias tqmnohomo
    url = 'http://localhost:8082/'

    registerMovimiento(movimiento){
        return axios.post(this.url + 'movimiento', movimiento);
    }    
    findAllMovimientos(){
        return axios.get(this.url+'movimiento');
    }
}