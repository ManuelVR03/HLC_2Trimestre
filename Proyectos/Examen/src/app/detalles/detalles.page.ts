import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Serie } from '../modelo/Serie';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
  standalone: false,
})
export class DetallesPage implements OnInit {

  serie?: Serie;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  
    this.route.queryParams.subscribe(params => {
  
      if (params['serie']) {
  
        this.serie = JSON.parse(params['serie']);
      }

    });
    
  }

}
