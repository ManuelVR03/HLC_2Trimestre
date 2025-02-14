import { Component, OnInit } from '@angular/core';

import { Storage } from '@ionic/storage';



@Component({

 selector: 'app-home',

 templateUrl: 'home.page.html',

 styleUrls: ['home.page.scss'],

 standalone: false,

})

export class HomePage {

 dato: string = '';

 mensaje: string = '';



 constructor(private storage: Storage) {}



 async ngOnInit() {

   await this.storage.create();

   this.mensaje = await this.storage.get('dato') || 'No hay datos almacenados';

 }



 async guardarDato() {

   await this.storage.set('dato', this.dato);

   this.mensaje = 'Dato guardado: ' + this.dato;

 }



 async borrarDato() {

   await this.storage.remove('dato');

   this.mensaje = 'Dato eliminado';

 }

}