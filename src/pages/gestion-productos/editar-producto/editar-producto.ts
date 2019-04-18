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

  producto: Producto 
  
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
 
 
  actualizar(producto: Producto) {
    this.productoService.actualizar(producto).then(() => {
      this.navCtrl.setRoot(ProductoPage);
    })
  }
 
  eliminar(producto: Producto) {
    this.productoService.eliminar(producto).then(() => {
      this.navCtrl.setRoot(ProductoPage);
    })
  }


  onChange(value) {
 // console.log(value);

  }
  
  configuaraciones(myEvent) {
    let popover = this.popoverCtrl.create(ConfiguaracionesPage);
    popover.present({
      ev: myEvent
    });
  }
}