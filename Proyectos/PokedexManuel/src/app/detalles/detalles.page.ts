import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pokemon } from '../modelo/Pokemon';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
  standalone: false
})
export class DetallesPage{

  pokemon?: Pokemon;

  constructor(private modalCtrl: ModalController) { }

  dismissModal(){
    this.modalCtrl.dismiss();
  }

}
