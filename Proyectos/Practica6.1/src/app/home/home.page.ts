import { Component } from '@angular/core';
import { FirestoreService } from '../providers/firestore.service';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton 
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, FormsModule],
})

export class HomePage {  
  first_name: string = '';

  constructor(private firestoreService: FirestoreService) {
    console.log('✅ HomePage cargada correctamente.');
    this.obtenerAlumnos();
  }

  clicBotonInsertar() {
    const alumno = { first_name: this.first_name };
    this.firestoreService.agregarAlumno(alumno)
      .then(() => {
        console.log('Alumno agregado correctamente!');
        this.first_name = '';
      })
      .catch((error) => {
        console.error('Error al agregar alumno:', error);
      });
  }

  obtenerAlumnos() {
    this.firestoreService.obtenerAlumnos()
      .subscribe((alumnos) => {
        console.log('Alumnos:', alumnos);
      });
  }
}
