import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class ApiServiceProvider {


    private URL = "http://localhost:3000";


    constructor(public http: HttpClient) {

    }

    getColeccion(coleccion: string, start: number, end: number): Promise<any[]> {
        
        let promise = new Promise<any[]>((resolve, reject) => {

            this.http.get(`${this.URL}/${coleccion}?_start=${start}&_end=${end}`).toPromise()
            
                .then((data: any) => {

                    let coleccion = new Array<any>();

                    data.forEach((element: any) => {

                        coleccion.push(element);

                    });

                    resolve(coleccion);

                })

                .catch((error: Error) => {

                    reject(error.message);

                });

        });

        return promise;

    }//end_getColeccion

}