import { Component} from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonText, IonCard, IonCardContent, IonGrid, IonCol, IonRow, IonCardHeader, IonCardTitle, IonIcon } from '@ionic/angular/standalone';
import { FirestoreService } from '../providers/firestore.service';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CustomIonInputDirective } from '../components/custom-ion-input';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonText, IonCard, IonCardContent, IonGrid, IonCol, IonRow, IonCardHeader, IonCardTitle, IonIcon, CommonModule, ReactiveFormsModule, CustomIonInputDirective]
})
export class HomePage {

  alumnos: any = [];
  nombre = new FormControl('');

  constructor(private firestoreService: FirestoreService) {
    this.obtenerAlumnos();
  }

  clicBotonInsertar() {
    console.log(this.nombre.value);
    const alumno = { nombre: this.nombre.value };
    this.firestoreService.agregarAlumno(alumno)
      .then(() => {
        console.log('Alumno agregado correctamente!');
        this.nombre.reset();
      })
      .catch((error) => {
        console.error('Error al agregar alumno:', error);
      });
  }

  clicBotonBuscar() {
    if (!this.nombre.value) {
      this.obtenerAlumnos();
      return;
    }
    this.firestoreService.buscarAlumno(this.nombre.value)
      .then((resultados) => {
        this.alumnos = resultados;
        this.nombre.reset();
      })
      .catch((error) => {
        console.error('Error al buscar alumno:', error);
      });
}


  obtenerAlumnos() {
    this.firestoreService.obtenerAlumnos()
      .subscribe((alumnos) => {
        console.log('Alumnos:', alumnos);
        this.alumnos = alumnos;
      });
  }
}
