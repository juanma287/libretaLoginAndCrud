import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController} from 'ionic-angular';
import { Producto } from '../../../model/producto/producto.model';
import { ProductoService } from '../../../services/producto.service';
import { ProductoPage } from "../producto/producto";
import {ConfiguaracionesPage} from "../../configuaraciones/configuaraciones";


@Component({
  selector: 'page-editar-producto',
  templateUrl: 'editar-producto.html',
})
export class EditarProductoPage {

  producto: Producto = {
    key:'',
    nombre: '',
    descripcion: '',
    precio: -1,
    unidad: '',
    cantidad: -1
   };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productoService: ProductoService,
    public popoverCtrl: PopoverController
    ) 
  {   
  }

  ionViewWillLoad() {
   this.producto = this.navParams.get('producto');
  }
 
 
  actualizarComercio(producto: Producto) {
    this.productoService.actualizar(producto).then(() => {
      this.navCtrl.setRoot(ProductoPage);
    })
  }
 
  eliminarComercio(producto: Producto) {
    this.productoService.eliminar(producto).then(() => {
      this.navCtrl.setRoot(ProductoPage);
    })
  }

  
  configuaraciones(myEvent) {
    let popover = this.popoverCtrl.create(ConfiguaracionesPage);
    popover.present({
      ev: myEvent
    });
  }
}