import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';



@Component({

  selector: 'app-search-modal',

  templateUrl: './search-modal.page.html',

  styleUrls: ['./search-modal.page.scss'],

  standalone: false

})

export class SearchModalPage {

  firstName: string = '';

  lastName: string = '';

  ciudad: string = '';


  constructor(private modalCtrl: ModalController) { }



  dismissModal() {

    this.modalCtrl.dismiss();

  }



  search() {

    this.modalCtrl.dismiss({

      firstName: this.firstName,

      lastName: this.lastName,

      ciudad: this.ciudad

    });

  }

}

