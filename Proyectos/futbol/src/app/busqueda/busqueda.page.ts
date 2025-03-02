import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiServiceProvider } from '../providers/api-service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
  standalone: false
})
export class BusquedaPage {

  ciudad: string = '';

  puntos: number = 0;

  ciudades: string[] = ["Madrid", "Barcelona", "Sevilla", "San Sebastián", "Bilbao", "Villarreal", "Vigo", "Pamplona",
    "Valladolid", "Valencia", "Eibar", "Zaragoza", "Leganés", "Gijón", "Burgos", "Santa Cruz de Tenerife", "Albacete",
    "Soria", "Teruel", "Ourense", "Aranda de Duero", "Talavera de la Reina", "Linares", "Pontevedra", "Segovia",
    "San Bartolomé de Tirajana", "Sagunto", "El Ejido", "Marbella", "Lepe", "Toledo"];


  constructor(private modalCtrl: ModalController, private apiService: ApiServiceProvider) {}

  dismissModal() {

    this.modalCtrl.dismiss();
  
  }

  search() {

    this.modalCtrl.dismiss({

      ciudad: this.ciudad,

      puntos: this.puntos

    });

  }

  

}
