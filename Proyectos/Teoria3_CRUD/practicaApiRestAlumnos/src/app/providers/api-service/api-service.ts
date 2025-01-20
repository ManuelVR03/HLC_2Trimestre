import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Alumno } from 'src/app/modelo/Alumno';


@Injectable()

export class ApiServiceProvider {


private URL = "http://localhost:3000";


constructor(public http: HttpClient) {

}


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


/*

Este método manda una solicitud de borrado a la Api del usuario con un id determinado.

Si el borrado va bien se sale son resolve devolviendo true.

Si el borrado va mal se sale con reject, devolviendo el mensaje de error que nos llega

*/


eliminarAlumno(id: number): Promise<Boolean> {

     let promise = new Promise<Boolean>((resolve, reject) => {

         this.http.delete(this.URL + "/alumnos/" + id).toPromise().then(

             (data: any) => { // Success

                 console.log(data)

                 resolve(true);

             }

         )

             .catch((error: Error) => {

                 console.log(error.message);

                 reject(error.message);

             });

     });

     return promise;

}//end_eliminar_alumno


}//end_class