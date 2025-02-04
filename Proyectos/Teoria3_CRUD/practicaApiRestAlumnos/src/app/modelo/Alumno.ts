import { AlumnoInterface } from "./AlumnoInterface";

export class Alumno implements AlumnoInterface {
    constructor(public id: number,
        public gender: string,
        public first_name: string,
        public last_name: string,
        public email: string,
        public avatar: string,
        public address: string,
        public city: string,
        public postalCode: string) {
    }
}