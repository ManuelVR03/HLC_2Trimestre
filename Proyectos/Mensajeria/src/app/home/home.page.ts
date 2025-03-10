import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  ubicacion: string = '';

  constructor() {}


  async getUbicacion() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.ubicacion = coordinates.coords.latitude + ', ' + coordinates.coords.longitude;
  }

  enviarCorreo(e: Event) {
    e.preventDefault();
    emailjs.sendForm('service_bh6rhce', 'template_7ciwwpe', e.target as HTMLFormElement, 'dzGjreqw7IAdKm_PN')
      .then((result: EmailJSResponseStatus) => {
        console.log('Correo enviado con éxito!', result.status, result.text);
        (e.target as HTMLFormElement).reset();
      }, (error) => {
        console.error('Error al enviar el correo:', error);
      });
  }
}
