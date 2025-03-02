import { DireccionInterface } from './DireccionInterface';

export interface UsuarioInterface {
    id: number;
    nombre: string;
    email: string;
    edad: number;
    direccion: DireccionInterface;
    telefono: number;
    historial_compras: number[];
}