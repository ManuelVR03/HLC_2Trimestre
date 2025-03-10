import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Serie } from '../modelo/Serie';


@Injectable()

export class ApiServiceProvider {


    private URL = "http://localhost:3000";


    constructor(public http: HttpClient) {

    }

    getSeries(coleccion: string, start: number, end: number): Promise<Serie[]> {

        let promise = new Promise<Serie[]>((resolve, reject) => {

            this.http.get(`${this.URL}/${coleccion}?_start=${start}&_end=${end}`).toPromise()

                .then((data: any) => {

                    let series = new Array<Serie>();

                    data.forEach((serie: Serie) => {

                        series.push(serie);

                    });

                    resolve(series);

                })

                .catch((error: Error) => {

                    reject(error.message);

                });

        });

        return promise;

    }

    buscarSeriesApi(genero: string, puntos: number, division: string): Promise<Serie[]> {

        let newUrl: string;

        if (genero === "") {

            newUrl = `${this.URL}/${division}`;

        } else {

            newUrl = `${this.URL}/${division}?genre=${genero}`;
        }

        return new Promise<Serie[]>((resolve, reject) => {


            this.http.get(newUrl).toPromise()

                .then((data: any) => {

                    let series = new Array<Serie>();

                    data.forEach((serie: Serie) => {

                        if (puntos === 0) {

                            series.push(serie);

                        } else {

                            if (serie.rating > puntos) {

                                series.push(serie);

                            }
                        }

                    });

                    resolve(series);

                })

                .catch((error: Error) => {

                    reject(error.message);

                });

        });

    }

    totalSeriesApi(coleccion: string): Promise<Serie[]> {

        let promise = new Promise<Serie[]>((resolve, reject) => {

            this.http.get(`${this.URL}/${coleccion}`).toPromise()

                .then((data: any) => {

                    let series = new Array<Serie>();

                    data.forEach((serie: Serie) => {

                        series.push(serie);

                    });

                    resolve(series);

                })

                .catch((error: Error) => {

                    reject(error.message);

                });

        });

        return promise;

    }

}