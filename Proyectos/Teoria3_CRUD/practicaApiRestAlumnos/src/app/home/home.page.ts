import { Component, OnInit } from '@angular/core';
import { ApiServiceProvider } from 'src/app/providers/api-service/api-service';
import { Alumno } from '../modelo/Alumno';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  public alumnos = new Array<Alumno>();

  constructor(private apiService: ApiServiceProvider) {
  }


  ngOnInit(): void {
    this.apiService.getAlumnos()
      .then((alumnos: Alumno[]) => {
        this.alumnos = alumnos;
        console.log(this.alumnos);
      })
      .catch((error: string) => {
        console.log(error);
      });
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

  eliminarTodos() {
    for(let i = 0; i < this.alumnos.length; i++)
      this.eliminarAlumno(i);
  }


}//end_class