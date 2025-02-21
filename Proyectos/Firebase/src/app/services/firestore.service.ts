import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {
  private firestore!: AngularFirestore; // ✅ Declaración explícita

  constructor() {
    try {
      this.firestore = inject(AngularFirestore); // ✅ Forzar inyección
      console.log("Firestore inicializado correctamente");
    } catch (error) {
      console.error("Error al inyectar Firestore:", error);
    }
  }

  // Método para añadir un documento a una colección
  agregarDocumento(coleccion: string, data: any): Promise<any> {
    return this.firestore.collection(coleccion).add(data)
      .then(res=> {
        console.log("Documento agregado con ID:", res.id);
        return res;
      })
      .catch(error => {
        console.error("Error al agregar documento:", error);
        throw error;
      });
  }

  // Método para obtener todos los documentos de una colección
  obtenerColeccion(coleccion: string): Observable<any[]> {
    console.log("Intentando obtener datos de la colección:", coleccion);
    return this.firestore.collection(coleccion).valueChanges();
  }
}





