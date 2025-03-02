import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from '../modelo/Usuario';
import { Producto } from '../modelo/Producto';
import { Pedido } from '../modelo/Pedido';
import { Direccion } from '../modelo/Direccion';
import { ProductoPedido } from '../modelo/ProductoPedido';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
  standalone: false,
})
export class DetallesPage implements OnInit {

  objeto: any = {};

  usuario?: Usuario;

  producto?: Producto;

  pedido?: Pedido;

  tipo: string = '';

  constructor(

    private storage: Storage,

    private route: ActivatedRoute

  ) {

   }

  ngOnInit(){

    this.route.queryParams.subscribe(params => {

      if (params['objeto']) {

        this.objeto = JSON.parse(params['objeto']);

        if (params['tipo'] == 'usuarios') {

          this.usuario = this.objeto as Usuario;

        }else if (params['tipo'] == 'productos') {

          this.producto = this.objeto as Producto;

        }else {

          this.pedido = this.objeto as Pedido;

        }

      }

    });

  }

}
