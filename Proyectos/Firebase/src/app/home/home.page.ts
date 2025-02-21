import { Component } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage {
  nombre: string = '';
  alumnos: any[] = [];

  constructor(private firestoreService: FirestoreService) {}

  agregarAlumno() {
    if (this.nombre.trim() !== '') {
      this.firestoreService.agregarDocumento('Alumnos', { nombre: this.nombre })
        .then(() => {
          console.log('Alumno agregado con éxito');
          this.nombre = ''; // Limpiar el input
        })
        .catch(error => console.error('Error al agregar alumno:', error));
    }
  }

  obtenerAlumnos() {
    console.log("Intentando obtener alumnos..."); // ✅ Mensaje de depuración
    this.firestoreService.obtenerColeccion('Alumnos').subscribe({
      next: (data) => {
        console.log("Datos recibidos de Firestore:", data);
        this.alumnos = data;
      },
      error: (err) => console.error("Error al obtener datos:", err)
    });
  }

  ionViewDidEnter() {
    this.obtenerAlumnos(); // Cargar alumnos al entrar en la página
  }
}

  