import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Comercio } from '../../../model/comercio/comercio.model';
import { ComercioService } from '../../../services/comercio.service';
import { ProductoPage } from "../producto/producto";



@Component({
  selector: 'page-editar-producto',
  templateUrl: 'editar-producto.html',
})
export class EditarProductoPage {

 comercio: Comercio = {
    key:'',
    id_duenio:'',
    calle:'',
    nombre: '',
    ciudad: '',
    clientes: '',
    productos: ''
   };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private comercioService: ComercioService) 
  {   
  }

  ionViewWillLoad() {
   this.comercio = this.navParams.get('comercio');
  }
 
 
  actualizarComercio(comercio: Comercio) {
    this.comercioService.actualizarComercio(comercio).then(() => {
      this.navCtrl.setRoot(ProductoPage);
    })
  }
 
  eliminarComercio(comercio: Comercio) {
    this.comercioService.eliminarComercio(comercio).then(() => {
      this.navCtrl.setRoot(ProductoPage);
    })
  }
}