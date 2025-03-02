import { Direccion } from "./Direccion";
import { PedidoInterface } from "./PedidoInterface";
import { ProductoPedido } from "./ProductoPedido";

export class Pedido implements PedidoInterface {
    constructor(public id: number,
        public usuario_id: number,
        public productos: ProductoPedido[],
        public fecha: Date,
        public total: number,
        public estado: string,
        public metodo_pago: string,
        public direccion_envio: Direccion) {
    }
}