import { UsuarioInterface } from "./UsuarioInterface";
import { Direccion } from "./Direccion";

export class Usuario implements UsuarioInterface {
    constructor(public id: number,
        public nombre: string,
        public email: string,
        public edad: number,
        public direccion: Direccion,
        public telefono: number,
        public historial_compras: number[]) {
    }
}