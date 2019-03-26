import { Component} from '@angular/core';
import { NavController, LoadingController, PopoverController, NavParams} from 'ionic-angular';;
import { Cuenta } from '../../../model/cuenta/cuenta.model';
//import { CuentaGeneral } from '../../../model/cuenta-general/cuenta-general.model';
import { CuentaService } from '../../../services/cuenta.service'
//import { ComercioService } from '../../../services/comercio.service';
//import { AgregarCuentaPage } from "../../gestion-cuentas/agregar-cuenta/agregar-cuenta";
//import { EditarCuentaPage } from "../editar-cuenta/editar-cuenta";
//import { Observable } from 'rxjs/Observable';
import { HomeComercioPage } from "../../home-comercio/home-comercio";
import {ConfiguaracionesPage} from "../../configuaraciones/configuaraciones";
import { DatePipe } from '@angular/common';



@Component({
  selector: 'anotar',
  templateUrl: 'anotar.html',
})
export class Anotar {

   cuenta: Cuenta;
   valoresCuenta:any;
   fechaParaHTML = new Date().toISOString();
 
   pipe = new DatePipe('es'); 
   fecha_compra_number : any;
   fecha_compra:any;
  

  constructor(
   	 public navCtrl: NavController,
  	 //private cuentaService: CuentaService,
  	 public loading: LoadingController,
     public popoverCtrl: PopoverController,
     public navParams: NavParams
  	 ) 
	  {
     // leemos el parametro y cargamos los valores en la variable valoresCuenta
     this.cuenta = this.navParams.data;
     this.valoresCuenta = (<any>Object).values(this.cuenta);
     this.valoresCuenta = this.valoresCuenta['0'];

     this.fecha_compra = this.pipe.transform(this.fechaParaHTML ,'dd/MM/yyyy');
     this.fecha_compra_number = new Date(this.fechaParaHTML).getTime();

             console.log(this.fechaParaHTML);
      console.log(this.fecha_compra);
       console.log(this.fecha_compra_number);
	  }

  ionViewDidLoad() {

  }

  cambiarFecha()
  {
    this.fecha_compra = this.pipe.transform(this.fechaParaHTML ,'dd/MM/yyyy');
    this.fecha_compra_number = new Date(this.fechaParaHTML).getTime();
  }

  volverHome()
  {
     this.navCtrl.push(HomeComercioPage);
  }

  agregar()
  {
  	// this.navCtrl.push(AgregarCuentaPage);
  }


   configuaraciones(myEvent) {
    let popover = this.popoverCtrl.create(ConfiguaracionesPage);
    popover.present({
      ev: myEvent
    });
  }

}
