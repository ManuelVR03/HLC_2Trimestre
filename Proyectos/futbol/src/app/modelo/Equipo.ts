import { EquipoInterface } from "./EquipoInterface";

export class Equipo implements EquipoInterface {
    constructor(
        public nombre: string,
        public entrenador: string,
        public estadio: string,
        public anio_fundacion: number,
        public puntos: number,
        public ciudad: string,
        public jugadores: string[]
    ) {
    }
}