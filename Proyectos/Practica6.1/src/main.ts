console.log('🔍 Iniciando Angular y Firebase...');

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from './environments/environment';
import { provideRouter, Router } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideFirebaseApp(() => {
      console.log('✅ Firebase inicializado');
      return initializeApp(environment.firebaseConfig);
    }),
    provideFirestore(() => {
      console.log('✅ Firestore inicializado');
      return getFirestore();
    }),
    provideRouter(routes),
  ]
})
.then(appRef => {
  console.log('✅ Aplicación Angular iniciada correctamente');

  // Forzar la navegación al Home después de la inicialización
  const router = appRef.injector.get(Router);
  router.navigateByUrl('/').then(() => {
    console.log('🚀 Navegación forzada a la página principal');
  }).catch(err => console.error('❌ Error al navegar:', err));
})
.catch(err => console.error('🚨 Error al iniciar Angular:', err));
  
