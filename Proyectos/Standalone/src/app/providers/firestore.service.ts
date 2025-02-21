import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, CollectionReference, DocumentData, query, where, getDocs } from '@angular/fire/firestore';
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
    agregarAlumno(data: any): Promise<DocumentData> {
        return addDoc(this.alumnosCollection, data);
    }

    // Obtener lista de alumnos
    obtenerAlumnos(): Observable<any[]> {
        return collectionData(this.alumnosCollection, { idField: 'id' });
    }

    async buscarAlumno(nombre: any): Promise<any[]> {
        const alumnosQuery = query(this.alumnosCollection, where('nombre', '==', nombre));
        const querySnapshot = await getDocs(alumnosQuery);

        // Mapear resultados a un array de objetos con ID
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    
}
