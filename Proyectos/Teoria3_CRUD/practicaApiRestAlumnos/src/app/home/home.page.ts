import { Component, OnInit } from '@angular/core';
import { ApiServiceProvider } from 'src/app/providers/api-service/api-service';
import { Alumno } from '../modelo/Alumno';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { SearchModalPage } from '../search-modal/search-modal.page';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  public alumnos = new Array<Alumno>();
  public currentPage = 1;
  public pageSize = 10;
  public totalAlumnos = new Array<Alumno>();
  buscando: boolean = false;
  public total: Number = 0;

  constructor(private apiService: ApiServiceProvider,
    public alertController: AlertController,
    private modalCtrl: ModalController, private http: HttpClient
  ) {
  }


  ngOnInit(): void {

    this.loadAlumnos();

    this.totalAlumno();

  }

  /*
  
  este método llama al método eliminarAlumno de la Api y le pasa el id del alumno a eliminar. Se devuelve un objeto Promise. Si el borrado ha ido bien se ejecuta el código asociado a la cláusula then. Símplemente se muestra por consola un mensaje y se elimina el alumno del array de alumnos de la clase, lo que hará que deje de verse en la vista.
  
  Si el borrado ha ido mal muestro por consola el error que ha ocurrido.
  
  */

  eliminarAlumno(indice: number) {

    this.apiService.eliminarAlumno(this.alumnos[indice].id)

      .then((correcto: Boolean) => {

        console.log("Borrado correcto del alumno con indice: " + indice);

        this.alumnos.splice(indice, 1);

      })

      .catch((error: string) => {

        console.log("Error al borrar: " + error);

      });

  }//end_eliminar_alumno

  async eliminarTodos() {
    const alert = await this.alertController.create({
      header: 'Estás seguro?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: () => {
            for (let i = 0; i < this.alumnos.length; i++)
              this.eliminarAlumno(i);
          }
        }
      ]
    });
    await alert.present();
  }

  async modificarAlumno(indice: number) {

    let alumno = this.alumnos[indice];

    const alert = await this.alertController.create({

      header: 'Modificar',

      inputs: [

        {

          name: 'first_name',

          type: 'text',

          value: alumno.first_name,

          placeholder: 'first_name'

        },

        {

          name: 'last_name',

          type: 'text',

          id: 'last_name',

          value: alumno.last_name,

          placeholder: 'last_name'

        },

        {

          name: 'email',

          id: 'email',

          type: 'text',

          value: alumno.email,

          placeholder: 'email'

        },

        {

          name: 'gender',

          id: 'gender',

          type: 'text',

          value: alumno.gender,

          placeholder: 'gender'

        },

        {

          name: 'avatar',

          value: alumno.avatar,

          type: 'url',

          placeholder: 'avatar'

        },

        {

          name: 'address',

          value: alumno.address,

          type: 'text',

          placeholder: 'address'

        },

        {

          name: 'city',

          value: alumno.city,

          type: 'text',

          placeholder: 'city'

        },

        {

          name: 'postalCode',

          value: alumno.postalCode,

          type: 'text',

          placeholder: 'postalCode'

        }

      ],

      buttons: [

        {

          text: 'Cancel',

          role: 'cancel',

          cssClass: 'secondary',

          handler: () => {

            console.log('Confirm Cancel');

          }

        }, {

          text: 'Ok',

          handler: (data) => {

            console.log(data);

            var alumnoModificado: Alumno = new Alumno(

              alumno.id,

              data['gender'],

              data['first_name'],

              data['last_name'],

              data['email'],

              data['avatar'],

              data['address'],

              data['city'],

              data['postalCode']);

            this.apiService.modificarAlumno(alumnoModificado)

              .then((alumno: Alumno) => {

                this.alumnos[indice] = alumno;

              })

              .catch((error: string) => {

                console.log(error);

              });

            console.log('Confirm Ok');

          }

        }

      ]

    });

    await alert.present();

  }//end_modificarAlumno

  totalAlumno(): void {

    this.apiService.getAlumnos()

      .then((alumnos: Alumno[]) => {

        this.totalAlumnos = alumnos;

        this.total = this.alumnos.length;

      })

      .catch((error: string) => {

        console.log(error);

      });

  }

  loadAlumnos(): void {

    this.buscando = false;

    this.apiService.getAlumnosPaginados((this.currentPage - 1) * this.pageSize, ((this.currentPage - 1) * this.pageSize) + this.pageSize)

      .then((alumnos: Alumno[]) => {

        this.alumnos = alumnos; // Sobrescribe en la primera página

        console.log(this.alumnos);

      })

      .catch((error: string) => {

        console.log(error);

      });

  }


  goToFirstPage(): void {

    this.currentPage = 1;

    this.loadAlumnos();

  }





  goToPreviousPage(): void {

    if (this.currentPage > 1) {

      this.currentPage--;

      this.loadAlumnos();

    }

  }





  goToNextPage(): void {

    this.currentPage++;

    this.loadAlumnos();

  }





  goToLastPage(): void {

    // Puedes implementar una llamada adicional para determinar la cantidad total de páginas.

    console.log(this.totalAlumnos.length);

    console.log(this.pageSize);

    this.currentPage = Math.ceil(this.totalAlumnos.length / this.pageSize);

    this.loadAlumnos();

  }


  async abrirModalBusqueda() {

    const modal = await this.modalCtrl.create({

      component: SearchModalPage,

    });



    await modal.present();



    // Recoge los datos al cerrar el modal

    const { data } = await modal.onDidDismiss();

    if (data) {

      const { firstName, lastName, ciudad } = data;



      // Llama al servicio para buscar los alumnos

      this.buscarAlumnos(firstName, lastName, ciudad);

    }

  }



  // Llama al servicio para buscar alumnos

  buscarAlumnos(nombre: string, apellido: string, ciudad: string) {

    this.buscando = true;

    this.apiService

      .buscarAlumnosPorNombreApellido(nombre, apellido, ciudad)

      .then((resultados) => {

        if (resultados.length == this.totalAlumnos.length)

          this.loadAlumnos();

        else

          this.alumnos = resultados; // Almacena los resultados en la lista

        console.log('Resultados encontrados:', this.alumnos);

      })

      .catch((error) => {

        console.error('Error al buscar alumnos:', error);

      });

  }

  async insertarAlumno() {

    const alert = await this.alertController.create({

      header: 'Insertar Alumno',

      inputs: [

        {

          name: 'first_name',

          type: 'text',

          placeholder: 'Nombre'

        },

        {

          name: 'last_name',

          type: 'text',

          placeholder: 'Apellido'

        },

        {

          name: 'email',

          type: 'text',

          placeholder: 'Email'

        },

        {

          name: 'gender',

          type: 'text',

          placeholder: 'Male / Female'

        },

        {

          name: 'avatar',

          type: 'text',

          placeholder: 'Avatar'

        },

        {

          name: 'address',

          type: 'text',

          placeholder: 'Address'

        },

        {

          name: 'city',

          type: 'text',

          placeholder: 'City'

        },

        {

          name: 'postalCode',

          type: 'text',

          placeholder: 'PostalCode'

        }

      ],

      buttons: [

        {

          text: 'Cancelar',

          role: 'cancel',

          handler: () => {

            console.log('Cancelado');

          }

        },

        {

          text: 'Insertar',

          handler: (data) => { 
            
            let nextId = Math.max(...this.totalAlumnos.map(alumno => Number(alumno.id))) + 1;

            const nuevoAlumno: Alumno = {

              id: nextId.toString(),

              first_name: data.first_name,

              last_name: data.last_name,

              email: data.email,

              gender: data.gender,
      
              avatar: data.avatar,
      
              address: data.address,
      
              city: data.city,
      
              postalCode: data.postalCode

            };

            this.apiService.insertarAlumno(nuevoAlumno)

              .then(() => {

                console.log("Alumno insertado correctamente");

                this.loadAlumnos();

              })

              .catch((error) => {

                console.log("Error al insertar: " + error);

              });

          }

        }

      ]

    });


    await alert.present();

  }


}//end_class