import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Equipo } from '../modelo/Equipo';


@Injectable()

export class ApiServiceProvider {


    private URL = "http://localhost:3000";


    constructor(public http: HttpClient) {

    }


    getEquipos(coleccion: string, start: number, end: number): Promise<Equipo[]> {

        let promise = new Promise<Equipo[]>((resolve, reject) => {

            this.http.get(`${this.URL}/${coleccion}?_start=${start}&_end=${end}`).toPromise()

                .then((data: any) => {

                    let equipos = new Array<Equipo>();

                    data.forEach((equipo: Equipo) => {

                        equipos.push(equipo);

                    });

                    resolve(equipos);

                })

                .catch((error: Error) => {

                    reject(error.message);

                });

        });

        return promise;

    }//end_getEquipos

    buscarEquipos(ciudad: string, puntos: number, division: string): Promise<Equipo[]> {

        ciudad = ciudad.toLowerCase().charAt(0).toLocaleUpperCase() + ciudad.slice(1);

        let newUrl: string;

        if (ciudad === "") {

            newUrl = `${this.URL}/${division}`;

        } else {

            newUrl = `${this.URL}/${division}?ciudad=${ciudad}`;
        }

        return new Promise<Equipo[]>((resolve, reject) => {


            this.http.get(newUrl).toPromise()

                .then((data: any) => {

                    let equipos = new Array<Equipo>();

                    data.forEach((equipo: Equipo) => {

                        if (puntos === 0) {

                            equipos.push(equipo);

                        } else {

                            if (equipo.puntos >= puntos) {

                                equipos.push(equipo);

                            }
                        }

                    });

                    resolve(equipos);

                })

                .catch((error: Error) => {

                    reject(error.message);

                });

        });

    }

    totalEquiposApi(division: string): Promise<Equipo[]> {

        let promise = new Promise<Equipo[]>((resolve, reject) => {

            this.http.get(`${this.URL}/${division}`).toPromise()

                .then((data: any) => {

                    let equipos = new Array<Equipo>();

                    data.forEach((equipo: Equipo) => {

                        equipos.push(equipo);

                    });

                    resolve(equipos);

                })

                .catch((error: Error) => {

                    reject(error.message);

                });

        });

        return promise;

    }

}