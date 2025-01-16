import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Alumno } from 'src/app/modelo/Alumno';


/*

@Injectable() es un decorador en Angular que marca una clase como un servicio inyectable. 

Se utiliza para declarar servicios que proporcionan lógica reutilizable o comparten datos entre diferentes partes de una aplicación Angular. Estos servicios suelen ser inyectados en componentes u otras clases usando el sistema de inyección de dependencias de Angular.

*/

@Injectable()

export class ApiServiceProvider {


    private URL = "http://localhost:3000";


    constructor(public http: HttpClient) {

    }


    /*
    
        El siguiente método devuelve un objeto 'Promise'.
    
    Esto es un elemento asíncrono que puede finalizar de dos formas: correctamente, en cuyo caso sale con resolve, o bien de forma incorrecta, acabando en ese caso con reject.
    
    El método llama al método get del atributo http, pasándole como parámetro la url que devuelve la colección alumnos de la Api.
    
    Lo que devuelve este método lo convertimos a Promise, para luego evaluar su resultado mediante then y catch.
    
    Si el acceso a la Api ha ido bien el código que se ejecuta es el ubicado en la cláusula then. Si ha ido mal se ejecuta el código ubicado en la cláusula catch.
    
    Si todo ha ido bien convertimos el array de objetos Json que nos llega a un array de objetos alumnos, y lo devolvemos con resolve.
    
    Si el acceso ha ido mal devolvemos el mensaje de error que no llega mediante reject.
    
    */


    getAlumnos(): Promise<Alumno[]> {

        let promise = new Promise<Alumno[]>((resolve, reject) => {

            this.http.get(this.URL + "/alumnos").toPromise()

                .then((data: any) => {

                    let alumnos = new Array<Alumno>();

                    data.forEach((alumno: Alumno) => {

                        console.log(alumno);

                        alumnos.push(alumno);

                    });

                    resolve(alumnos);

                })

                .catch((error: Error) => {

                    reject(error.message);

                });

        });

        return promise;

    }//end_getAlumnos


}//end_class