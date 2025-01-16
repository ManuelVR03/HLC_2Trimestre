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

  /*
  
  cuando se carga la pantalla se llama al método getAlumnos de la Api. Este es un método asíncrono que devuelve un objeto Promise del que debe ser evaluado el resultado.
  
  Si el acceso a la Api ha ido bien se ejecuta el código asociado a la cláusula then.  Símplemente se coge el array de alumnos que llega y se asocia a él el atributo alumnos de la clase.
  
  Si ha ido mal el acceso (por ejemplo si no hemos lanzado jsonServer) se coge el error que llega y se muestra por consola.
  
  */


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


}//end_class