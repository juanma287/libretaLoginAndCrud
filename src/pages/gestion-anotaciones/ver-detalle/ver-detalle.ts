import { Component} from '@angular/core';
import { NavController, PopoverController, NavParams} from 'ionic-angular';;
//import { Cuenta } from '../../../model/cuenta/cuenta.model';
import { Compra } from '../../../model/compra/compra.model';
import { Detalle } from '../../../model/detalle/detalle.model';
//import { AnotacionesService } from '../../../services/anotaciones.service'
import {ConfiguaracionesPage} from "../../configuaraciones/configuaraciones";
//import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'page-ver-detalle',
  templateUrl: 'ver-detalle.html',
})
export class VerDetallePage {
 

   // Compra  con su detalle
   compra: Compra;
   detalle: any;
   valoresCompra:any;
   cantidad: any;
   

  constructor(
   	 public navCtrl: NavController,
     public popoverCtrl: PopoverController,
     public navParams: NavParams
  	 ) 
	  {
     this.valoresCompra = (<any>Object).values(this.navParams.data);
     this.compra = this.valoresCompra['0'];
     this.detalle = this.valoresCompra['0'].detalle.valueOf(); 
     console.log(this.valoresCompra);
     console.log(this.valoresCompra.keys);
     console.log(this.detalle);

	  }

  ionViewDidLoad() {
    
  }

  verDetalle()
  {

  }


  configuaraciones(myEvent) {
    let popover = this.popoverCtrl.create(ConfiguaracionesPage);
    popover.present({
      ev: myEvent
    });
  }

}
