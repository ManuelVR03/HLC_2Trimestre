import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ApiServiceProvider } from '../providers/api-service';
import { Serie } from '../modelo/Serie';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { BusquedaPage } from '../busqueda/busqueda.page';

enum StorageTypeEnum {
  NETFLIX = 'netflix',
  AMAZON = 'amazon',
  MAX = 'max'
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  storageType: string = StorageTypeEnum.NETFLIX;
  series: Serie[] = []
  buscando: boolean = false;
  public currentPage = 1;
  public pageSize = 3;
  public total = new Array<Serie>();


  constructor(

    private storage: Storage,

    private toastController: ToastController,

    private apiService: ApiServiceProvider,

    private navCtrl: NavController,

    private modalController: ModalController
  ) { }

  async ngOnInit(): Promise<void> {

    await this.storage.create();

    this.storage.get('storageType').then((value: any) => {

      this.storageType = value || StorageTypeEnum.NETFLIX;

      this.loadSeries();

    }).catch(() => {

      this.presentToast("Error al cargar el tipo de almacenamiento");

    });

    this.totalSeries();

  }

  loadSeries() {

    this.buscando = false;

    this.apiService.getSeries(this.storageType, (this.currentPage - 1) * this.pageSize, ((this.currentPage - 1) * this.pageSize) + this.pageSize).then((data: any) => {

      this.series = data;

    }).catch((error: string) => {

      this.presentToast("Error al cargar " + this.storageType + " " + error);

    });

  }

  totalSeries() {

    this.apiService.totalSeriesApi(this.storageType).then((data: any) => {

      this.total = data;

    }).catch((error: string) => {

      this.presentToast("Error al cargar el total de series " + error);

    });

  }

  goToFirstPage(): void {

    this.currentPage = 1;

    this.loadSeries();

  }

  goToPreviousPage(): void {

    if (this.currentPage > 1) {

      this.currentPage--;

      this.loadSeries();

    }

  }

  goToNextPage(): void {

    if (this.currentPage < Math.ceil(this.total.length / this.pageSize))

      this.currentPage++;

    this.loadSeries();

  }

  goToLastPage(): void {

    this.currentPage = Math.ceil(this.total.length / this.pageSize);

    this.loadSeries();

  }

  goToDetalles(serie: Serie) {

    const navigationExtras: NavigationExtras = {

      queryParams: {

        serie: JSON.stringify(serie),

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

      const { genero, puntos } = data;

      // Llama al servicio para buscar los alumnos

      this.buscarSeries(genero, puntos);

    }

  }

  buscarSeries(genero: string, puntos: number) {

    this.apiService.buscarSeriesApi(genero, puntos, this.storageType).then((resultado) => {

      if (resultado.length == 0) {

        this.presentToast("No se han encontrado series");
        this.loadSeries();

      } else { 

        this.series = resultado;

      }

    }).catch((error: string) => {

      this.presentToast("Error al buscar series " + error);
      this.loadSeries();

    });

  }

  guardarOpcion(event: any){

    this.storage.set('storageType', event.detail.value).then(() => {

      this.storageType = event.detail.value;

      this.goToFirstPage();

      this.loadSeries();
    
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
