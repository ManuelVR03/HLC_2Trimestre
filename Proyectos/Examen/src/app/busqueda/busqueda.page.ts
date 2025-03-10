import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
  standalone: false
})
export class BusquedaPage{

  genero: string = '';

  puntos: number = 0;

  generos: string[] = ["Sci-Fi", "Fantasy", "Drama", "Crime", "Fantasy",
    "Romance", "Thriller", "Action", "Animation", "Comedy", "War"
  ];


  constructor(private modalCtrl: ModalController) {}

  dismissModal() {

    this.modalCtrl.dismiss();
  
  }

  search() {

    this.modalCtrl.dismiss({

      genero: this.genero,

      puntos: this.puntos

    });

  }

}