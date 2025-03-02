import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AlertController, ModalController, NavController, ToastController } from '@ionic/angular';
import { ApiServiceProvider } from 'src/app/providers/api-service';
import { NavigationExtras } from '@angular/router';
import { Equipo } from 'src/app/modelo/Equipo';
import { BusquedaPage } from '../busqueda/busqueda.page';

enum StorageTypeEnum {

  PRIMERA = 'primera_division',
  SEGUNDA = 'segunda_division',
  TERCERA = 'tercera_division'

}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})

export class HomePage implements OnInit {

  storageType: string = StorageTypeEnum.PRIMERA;
  coleccion: Equipo[] = [];
  buscando: boolean = false;
  public currentPage = 1;
  public pageSize = 6;
  public total = new Array<Equipo>();

  constructor(

    private storage: Storage,

    private toastController: ToastController,

    private apiService: ApiServiceProvider,

    private navCtrl: NavController,

    private alertController: AlertController,

    private modalController: ModalController

  ) {}

  async ngOnInit(): Promise<void> {

    await this.storage.create();

    this.storage.get('storageType').then((value: any) => {

      this.storageType = value || StorageTypeEnum.PRIMERA;

      this.loadDivision();

    }).catch(() => {
      
      this.presentToast("Error al cargar el tipo de almacenamiento");

    });

    this.totalEquipos();

  }

  loadDivision() {

    this.buscando = false;
    
    this.apiService.getEquipos(this.storageType, (this.currentPage-1)*this.pageSize, ((this.currentPage-1)*this.pageSize) + this.pageSize).then((data: any) => {

      this.coleccion = data;

    }).catch((error: string) => {

      this.presentToast("Error al cargar " + this.storageType + " " + error);

    });

  }

  totalEquipos() {

    this.apiService.totalEquiposApi(this.storageType).then((data: any) => {

      this.total = data;

    }).catch((error: string) => {

      this.presentToast("Error al cargar el total de equipos " + error);

    });

  }

  goToFirstPage(): void {

    this.currentPage = 1;

    this.loadDivision();

  }

  goToPreviousPage(): void {

    if (this.currentPage > 1) {

      this.currentPage--;

      this.loadDivision();

    }

  }

  goToNextPage(): void {

    if (this.currentPage < Math.ceil(this.total.length / this.pageSize))

    this.currentPage++;

    this.loadDivision();

  }

  goToLastPage(): void {

    this.currentPage = Math.ceil(this.total.length / this.pageSize);

    this.loadDivision();

  }

  goToDetalles(equipo: Equipo){

    const navigationExtras: NavigationExtras = {

      queryParams: {

        equipo: JSON.stringify(equipo),

      }

    };

    this.navCtrl.navigateForward('/detalles', navigationExtras);

  }

  async abrirModalBusqueda() {

    this.buscando = true;

    const modal = await this.modalController.create({

      component: BusquedaPage,

    });

    await modal.present();

    // Recoge los datos al cerrar el modal

    const { data } = await modal.onDidDismiss();

    if (data) {

      const { ciudad, puntos } = data;

      // Llama al servicio para buscar los alumnos

      this.buscarEquipos(ciudad, puntos);

    }

  }

  async abrirAlertBusqueda() {

    this.buscando = true;

    const alert = await this.alertController.create({

      header: 'Buscar equipos',

      message: 'Introduce los datos de búsqueda',

      inputs: [

        {

          name: 'ciudad',

          type: 'text',

          placeholder: 'Ciudad'

        },

        {

          name: 'puntos',

          type: 'number',

          placeholder: 'Puntos',

          value: 0

        }

      ],

      buttons: [

        {

          text: 'Cancelar',

          role: 'cancel',

          handler: () => {

            this.buscando = false;

          }

        },

        {

          text: 'Buscar',

          handler: (data) => {

            this.buscarEquipos(data.ciudad, data.puntos);

          }

        }

      ]

    });

    await alert.present();

  }

  buscarEquipos(ciudad: string, puntos: number) {

    this.apiService.buscarEquipos(ciudad, puntos, this.storageType).then((resultado) => {

      if (resultado.length == 0) {

        this.presentToast("No se han encontrado equipos");
        this.loadDivision();

      } else { 

        this.coleccion = resultado;

      }

      

    }).catch((error: string) => {

      this.presentToast("Error al buscar equipos " + error);
      this.loadDivision();

    });

  }

  guardarOpcion(event: any){

    this.storage.set('storageType', event.detail.value).then(() => {

      this.storageType = event.detail.value;

      this.goToFirstPage();

      this.loadDivision();
    
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
