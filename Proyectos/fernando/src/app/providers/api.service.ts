import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../modelo/Persona';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private URL = "http://localhost:3000";

  constructor(public http: HttpClient) { }


  haz(){
    console.log("entra")
  }


getMedicosPaginados(start: number, end: number): Promise<Persona[]> {
   return new Promise<Persona[]>((resolve, reject) => {
       this.http.get(`${this.URL}/medicos?_start=${start}&_end=${end}&_sort=last_name`).toPromise()
           .then((data: any) => {
               let medicos = new Array<Persona>();
               console.log(`${this.URL}/medicos?_start=${start}&_end=${end}`);
               data.forEach((medico: Persona) => {
                  medicos.push(medico);
               });
               resolve(medicos);

           })
           .catch((error: Error) => {
               reject(error.message);
           });
   });
}

getPolciasPaginados(start: number, end: number): Promise<Persona[]> {
   return new Promise<Persona[]>((resolve, reject) => {
       this.http.get(`${this.URL}/policias?_start=${start}&_end=${end}&_sort=last_name`).toPromise()
           .then((data: any) => {
               let policias = new Array<Persona>();
               console.log(`${this.URL}/policias?_start=${start}&_end=${end}`);
               data.forEach((policia: Persona) => {
                  policias.push(policia);
               });
               resolve(policias);
           })
           .catch((error: Error) => {
               reject(error.message);
           });
   });
}

getPolciasBomberosPaginados(start: number, end: number): Promise<Persona[]> {
   return new Promise<Persona[]>((resolve, reject) => {
       this.http.get(`${this.URL}/bomberos?_start=${start}&_end=${end}&_sort=last_name`).toPromise()
           .then((data: any) => {
               let bomberos = new Array<Persona>();
               console.log(`${this.URL}/bomberos?_start=${start}&_end=${end}`);
               data.forEach((bombero: Persona) => {
                  bomberos.push(bombero);
               });
               resolve(bomberos);
           })
           .catch((error: Error) => {
               reject(error.message);
           });
   });
}


getItems(tipo: string): Promise<Persona[]> {
   console.log("entra get Items ----------")
   let promise = new Promise<Persona[]>((resolve, reject) => {
      this.http.get(this.URL + "/"+tipo).toPromise()
         .then((data: any) => {
            let items = new Array<Persona>();
            data.forEach((item: Persona) => {
               //console.log(item);
               items.push(item);
            });
            resolve(items);
         })
         .catch((error: Error) => {
            reject(error.message);
         });
   });
   return promise;
}









}


