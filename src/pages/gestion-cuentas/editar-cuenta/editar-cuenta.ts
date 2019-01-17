import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Comercio } from '../../../model/comercio/comercio.model';
import { ComercioService } from '../../../services/comercio.service';
import { CuentaPage} from "../cuenta/cuenta";



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
    private comercioService: ComercioService) 
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
}