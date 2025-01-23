import { Component, OnInit } from '@angular/core';
import { ApiServiceProvider } from 'src/app/providers/api-service/api-service';
import { Alumno } from '../modelo/Alumno';
import { AlertController } from '@ionic/angular';

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

  constructor(private apiService: ApiServiceProvider,
    public alertController: AlertController
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

      })

      .catch((error: string) => {

        console.log(error);

      });

  }

  loadAlumnos(): void {

    this.apiService.getAlumnosPaginados((this.currentPage - 1) * 10, ((this.currentPage - 1) * 10) + this.pageSize)

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



}//end_class