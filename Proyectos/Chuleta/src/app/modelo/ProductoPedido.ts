import { ProductoPedidoInterface } from "./ProductoPedidoInterface";

export class ProductoPedido implements ProductoPedidoInterface {
    constructor(public producto_id: number,
        public cantidad: number,
        public precio: number)
    {}
}