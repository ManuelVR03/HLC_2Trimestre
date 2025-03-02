import { Component, OnInit } from '@angular/core';
import { ApiService } from '../providers/api.service';
import { Storage } from '@ionic/storage-angular';
import { AlertController, ModalController, NavController, ToastController } from '@ionic/angular';
import { Persona } from '../modelo/Persona';


enum StorageTypeEnum {

  MEDICOS = 'medicos',
  POLICIAS = 'policias',
  BOMBEROS = 'bomberos',
 
 }

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  public items: any[] = []; // Esta variable mostrará los datos en la vista

  //variables de paginacion
  public personas = new Array<Persona>();
  public currentPage = 1;
  public pageSize = 10;
  public totalPersonas = new Array<Persona>();
  public total: Number = 0;

  storageType: string = StorageTypeEnum.MEDICOS;

  constructor(
    private apiService: ApiService,
    public alertController:AlertController, 
    private storage: Storage, 
    private toastController: ToastController
  ) {}


  async ngOnInit(): Promise<void> {
    
    await this.storage.create();
    
    this.storage.get('storageType').then((val) => {
      this.storageType = val || StorageTypeEnum.MEDICOS;
      this.cargarDatos(); // 🔹 Cargar los datos correspondientes

      this.funTotalPersonas(StorageTypeEnum.MEDICOS)
      console.log("-------------///*****")
      console.log(this.totalPersonas)

    }).catch(() => {
      this.presentToast("Error al recuperar la opción de conexión");
    });
  }

  // funciones Storage / Toast ----------------------------------------------------------------
  async presentToast(message: string) {
    const toast = await this.toastController.create({ message, duration: 2000 });
    await toast.present();
  }

  guardarOpcion(event: any) {
    this.storage.set('storageType', event.detail.value).then(() => {
      this.storageType = event.detail.value;
      console.log("Opción de almacenamiento guardada:", this.storageType);
      this.cargarDatos(); 
    }).catch((error) => {
      console.error("Error al guardar la opción:", error);
    });
  }

  cargarDatos() {
    if (this.storageType === 'medicos') {

      this.apiService.getMedicosPaginados((this.currentPage-1)*10, ((this.currentPage-1)*10) + this.pageSize)
      .then((medicos: Persona[]) => {
        this.items = medicos; // Sobrescribe en la primera página
        console.log(this.items);
      })
      .catch((error: string) => {
        console.log(error);
      });


    } else if (this.storageType === 'policias') {

      this.apiService.getPolciasPaginados((this.currentPage-1)*10, ((this.currentPage-1)*10) + this.pageSize)
      .then((policias: Persona[]) => {
        this.items = policias; // Sobrescribe en la primera página
        console.log(this.items);
      })
      .catch((error: string) => {
        console.log(error);
      });

    } else if (this.storageType === StorageTypeEnum.BOMBEROS) {

      this.apiService.getPolciasBomberosPaginados((this.currentPage-1)*10, ((this.currentPage-1)*10) + this.pageSize)
      .then((bomberos: Persona[]) => {
        this.items = bomberos; // Sobrescribe en la primera página
        console.log(this.items);
      })
      .catch((error: string) => {
        console.log(error);
      });

    }
  }

  funTotalPersonas(tipo: string): void {

    this.apiService.getItems(tipo)
      .then((personas: Persona[]) => {
        this.totalPersonas = personas;
        console.log("TOTAL PERSONAS")
        console.log(this.totalPersonas)
        this.total = this.totalPersonas.length;
      })
      .catch((error: string) => {
        console.log(error);
      });
  }



  goToFirstPage(): void {
    this.currentPage = 1;
    this.cargarDatos();
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.cargarDatos();
    }
  }

  goToNextPage(): void {
    this.currentPage++;
    this.cargarDatos();
  }

  goToLastPage(): void {
    // Puedes implementar una llamada adicional para determinar la cantidad total de páginas.
    console.log(this.totalPersonas.length);
    console.log(this.pageSize);
    this.currentPage = Math.ceil(this.totalPersonas.length / this.pageSize);
    this.cargarDatos();
  }



}
  


/*
Storage

npm install --save @ionic/storage

npm audit fix --force


*/
