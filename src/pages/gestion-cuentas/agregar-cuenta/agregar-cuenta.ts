import { Component } from '@angular/core';
import { NavController, NavParams,AlertController, PopoverController} from 'ionic-angular';
import { Cuenta } from '../../../model/cuenta/cuenta.model';
import { CuentaService } from '../../../services/cuenta.service';
import { CuentaPage} from "../cuenta/cuenta";
import {ConfiguaracionesPage} from "../../configuaraciones/configuaraciones";
import { DatePipe } from '@angular/common';


@Component({
  selector: 'page-agregar-cuenta',
  templateUrl: 'agregar-cuenta.html',
})
export class AgregarCuentaPage {


 public cuenta: Cuenta = {
    id_cliente:'',
    nombre:'',
    observacion:'',
    total_deuda: 0,  
    fecha_ultimo_pago: '',
    fehca_alta: ''
    };
 
    pipe = new DatePipe('es'); 
    hoy = Date.now();

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	private cuentaService: CuentaService,
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController
  	) {

     // de esa forma guardamos la hora
     //this.cuenta.fehca_alta = this.pipe.transform(this.hoy, 'dd/MM/yyyy, h:mm a');

     this.cuenta.fehca_alta = this.pipe.transform(this.hoy, 'dd/MM/yyyy');
  }


  agregar(cuenta: Cuenta) {
     var estadoConexion = this.cuentaService.estadoConex;
     if(estadoConexion)
     {
          this.cuentaService.agregar(cuenta).then(ref => { 
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

  onChange(value) {
  console.log(value);

  }

 
  configuaraciones(myEvent) {
    let popover = this.popoverCtrl.create(ConfiguaracionesPage);
    popover.present({
      ev: myEvent
    });
  }


}
