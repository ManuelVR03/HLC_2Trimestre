import { ProductoInterface } from "./ProductoInterface";

export class Producto implements ProductoInterface {
    constructor(public id: number,
        public nombre: string,
        public descripcion: string,
        public precio: number,
        public stock: number,
        public categoria: string,
        public marca: string)

    {}
}