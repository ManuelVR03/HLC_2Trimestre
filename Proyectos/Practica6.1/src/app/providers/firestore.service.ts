import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, CollectionReference, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {
    private alumnosCollection: CollectionReference<DocumentData>;

    constructor(private firestore: Firestore) {
        this.alumnosCollection = collection(this.firestore, 'Alumnos');
    }

    // Agregar alumno a Firestore
    agregarAlumno(data: any): Promise<void | unknown> {
        return addDoc(this.alumnosCollection, data)
            .then(() => console.log('Alumno agregado correctamente'))
            .catch((error) => console.error('Error al agregar alumno:', error));
    }

    // Obtener lista de alumnos
    obtenerAlumnos(): Observable<any[]> {
        return collectionData(this.alumnosCollection, { idField: 'id' });
    }
}
