import { DireccionInterface } from './DireccionInterface';

export class Direccion implements DireccionInterface {
    constructor(public calle: string,
        public numero: number,
        public ciudad: string,
        public pais: string) {
    }
}