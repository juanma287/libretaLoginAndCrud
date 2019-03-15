import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { Cuenta } from '../../../model/cuenta/cuenta.model';
import { CuentaService } from '../../../services/cuenta.service';
import { CuentaPage} from "../cuenta/cuenta";
import {ConfiguaracionesPage} from "../../configuaraciones/configuaraciones";


@Component({
  selector: 'page-editar-cuenta',
  templateUrl: 'editar-cuenta.html',
})
export class EditarCuentaPage {

  cuenta: Cuenta 

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cuentaService: CuentaService,
    public popoverCtrl: PopoverController
    ) 
  {   
  }

  ionViewWillLoad() {
   this.cuenta = this.navParams.get('cuenta');
  }
 

  actualizar(cuenta: Cuenta) {
    this.cuentaService.actualizar(cuenta).then(() => {
      this.navCtrl.setRoot(CuentaPage);
    })
  }
 
  eliminar(cuenta: Cuenta) {
    this.cuentaService.eliminar(cuenta).then(() => {
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