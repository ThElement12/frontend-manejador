import axios from "axios";

export class InventarioService {
    // TODO: mi loco usa esta clase como servicio pa todas las entidades pa no complicarnos, gracias tqmnohomo
    url = 'http://localhost:8082/'

    findAllMovimientos(){
        return axios.get(this.url+'movimiento')
    }
}