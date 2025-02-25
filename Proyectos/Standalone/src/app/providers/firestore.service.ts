import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, CollectionReference, DocumentData, query, where, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Auth, getAuth } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {
    private alumnosCollection: CollectionReference<DocumentData>;
    private auth = getAuth();

    constructor(private firestore: Firestore) {
        this.alumnosCollection = collection(this.firestore, 'Alumnos');
    }

    // Agregar alumno a Firestore
    agregarAlumno(data: any): Promise<DocumentData> {
        if (!this.auth.currentUser) {
            throw new Error('No hay usuario autenticado');
        }
        return addDoc(this.alumnosCollection, data);
    }

    // Obtener lista de alumnos
    obtenerAlumnos(): Observable<any[]> {
        if (!this.auth.currentUser) {
            throw new Error('No hay usuario autenticado');
        }
        return collectionData(this.alumnosCollection, { idField: 'id' });
    }

    async buscarAlumno(nombre: any): Promise<any[]> {
        if (!this.auth.currentUser) {
            throw new Error('No hay usuario autenticado');
        }
        const alumnosQuery = query(this.alumnosCollection, where('nombre', '==', nombre));
        const querySnapshot = await getDocs(alumnosQuery);

        // Mapear resultados a un array de objetos con ID
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    
}
