import { Component } from '@angular/core';
import { NavController, NavParams,AlertController, PopoverController} from 'ionic-angular';
import { Producto } from '../../../model/producto/producto.model';
import { ProductoService } from '../../../services/producto.service';
import { ProductoPage} from "../producto/producto";
import {ConfiguaracionesPage} from "../../configuaraciones/configuaraciones";

@Component({
  selector: 'page-agregar-producto',
  templateUrl: 'agregar-producto.html',
})
export class AgregarProductoPage {

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
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController

  	) {
  }


  agregarComercio(producto: Producto) {
     var estadoConexion = this.productoService.estadoConex;
     if(estadoConexion)
     {
          this.productoService.agregar(producto).then(ref => { 
                  this.navCtrl.setRoot(ProductoPage);
                })           

     }
     else
     {
         const alert = this.alertCtrl.create({
          title: 'Error: sin conexión',
          subTitle: 'Para realizar la operación conéctese y vuelva a intentarlo',
          buttons: ['OK']
        });
        alert.present();
     }  
  }

 
  configuaraciones(myEvent) {
    let popover = this.popoverCtrl.create(ConfiguaracionesPage);
    popover.present({
      ev: myEvent
    });
  }


}
