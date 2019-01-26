import { Component } from '@angular/core';
import { NavController, NavParams,AlertController, PopoverController} from 'ionic-angular';
import { Comercio } from '../../../model/comercio/comercio.model';
import { ComercioService } from '../../../services/comercio.service';
import { CuentaPage} from "../cuenta/cuenta";
import {ConfiguaracionesPage} from "../../configuaraciones/configuaraciones";

@Component({
  selector: 'page-agregar-cuenta',
  templateUrl: 'agregar-cuenta.html',
})
export class AgregarCuentaPage {

  comercio: Comercio = {
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
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController
  	) {
  }


  agregarComercio(comercio: Comercio) {
     var estadoConexion = this.comercioService.estadoConex;
     if(estadoConexion)
     {
          this.comercioService.agregarComercio(comercio).then(ref => { 
                  this.navCtrl.setRoot(CuentaPage);
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
