import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { Comercio } from '../../../model/comercio/comercio.model';
import { ComercioService } from '../../../services/comercio.service';
import { CuentaPage} from "../cuenta/cuenta";
import {ConfiguaracionesPage} from "../../configuaraciones/configuaraciones";


@Component({
  selector: 'page-editar-cuenta',
  templateUrl: 'editar-cuenta.html',
})
export class EditarCuentaPage {

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
    private comercioService: ComercioService,
    public popoverCtrl: PopoverController
    ) 
  {   
  }

  ionViewWillLoad() {
   this.comercio = this.navParams.get('comercio');
  }
 
 
  actualizarComercio(comercio: Comercio) {
    this.comercioService.actualizarComercio(comercio).then(() => {
      this.navCtrl.setRoot(CuentaPage);
    })
  }
 
  eliminarComercio(comercio: Comercio) {
    this.comercioService.eliminarComercio(comercio).then(() => {
      this.navCtrl.setRoot(CuentaPage);
    })
  }

  configuaraciones(myEvent) {
    let popover = this.popoverCtrl.create(ConfiguaracionesPage);
    popover.present({
      ev: myEvent
    });
  }
}