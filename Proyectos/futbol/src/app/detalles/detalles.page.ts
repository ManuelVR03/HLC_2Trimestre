import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Equipo } from '../modelo/Equipo';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
  standalone: false
})
export class DetallesPage implements OnInit {

  equipo?: Equipo;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  
    this.route.queryParams.subscribe(params => {
  
      if (params['equipo']) {
  
        this.equipo = JSON.parse(params['equipo']);
      }

    });
    
  }

}
