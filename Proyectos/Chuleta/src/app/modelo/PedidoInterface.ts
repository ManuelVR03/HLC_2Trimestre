import { DireccionInterface } from "./DireccionInterface";
import { ProductoPedidoInterface } from "./ProductoPedidoInterface";

export interface PedidoInterface {
    id: number;
    usuario_id: number;
    productos: ProductoPedidoInterface[];
    fecha: Date;
    total: number;
    estado: string;
    metodo_pago: string;
    direccion_envio: DireccionInterface;
}