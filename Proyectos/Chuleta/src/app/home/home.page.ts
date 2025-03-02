import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';
import { ApiServiceProvider } from 'src/app/providers/api-service';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { Usuario } from 'src/app/modelo/Usuario';
import { Producto } from 'src/app/modelo/Producto';
import { Pedido } from 'src/app/modelo/Pedido';


enum StorageTypeEnum {

  USUARIOS = 'usuarios',
  PRODUCTOS = 'productos',
  PEDIDOS = 'pedidos'

}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})

export class HomePage implements OnInit {

  storageType: string = StorageTypeEnum.USUARIOS;
  coleccion: any = [];
  public currentPage = 1;
  public pageSize = 10;

  constructor(
    
    private storage: Storage,
  
    private toastController: ToastController,

    private apiService: ApiServiceProvider,

    private navCtrl: NavController

  ) {}

  async ngOnInit(): Promise<void> {

    await this.storage.create();

    this.storage.get('storageType').then((value: any) => {

      this.storageType = value || StorageTypeEnum.USUARIOS;

      this.loadColeccion();

    }).catch(() => {
      
      this.presentToast("Error al cargar el tipo de almacenamiento");

    });

    this.loadColeccion();

  }

  loadColeccion(){

      this.apiService.getColeccion(this.storageType, (this.currentPage-1)*10, ((this.currentPage-1)*10) + this.pageSize).then((data: any) => {

        this.coleccion = data;

      }).catch((error: string) => {

        this.presentToast("Error al cargar la colección de " + this.storageType + " " + error);

      });

  }

  goToFirstPage(): void {

    this.currentPage = 1;

    this.loadColeccion();

  }

  goToPreviousPage(): void {

    if (this.currentPage > 1) {

      this.currentPage--;

      this.loadColeccion();

    }

  }

  goToNextPage(): void {

    if (this.currentPage < Math.ceil(50 / this.pageSize))

    this.currentPage++;

    this.loadColeccion();

  }

  goToLastPage(): void {

    this.currentPage = Math.ceil(50 / this.pageSize);

    this.loadColeccion();

  }

  goToDetalles(objeto: any){

    const navigationExtras: NavigationExtras = {

      queryParams: {

        objeto: JSON.stringify(objeto),

        tipo: this.storageType

      }

    };

    this.navCtrl.navigateForward('/detalles', navigationExtras);

  }


  guardarOpcion(event: any){

    this.storage.set('storageType', event.detail.value).then(() => {

      this.storageType = event.detail.value;

      this.goToFirstPage();

      this.loadColeccion();
    
    });

  }

  async presentToast(message: string) {

    const toast = await this.toastController.create({

      message: message,

      duration: 3000,

      position: 'top',

      buttons: [
        
        {

          text: 'Cerrar',

          role: 'cancel',

        }

      ]

    });

    toast.present();

  }

}
