import { Component} from '@angular/core';
import { NavController,AlertController, PopoverController, NavParams} from 'ionic-angular';
import { Compra } from '../../../model/compra/compra.model';
import { Detalle } from '../../../model/detalle/detalle.model';
import { ConfiguaracionesPage } from "../../configuaraciones/configuaraciones";
import { AnotacionesService } from '../../../services/anotaciones.service'



@Component({
  selector: 'page-ver-detalle',
  templateUrl: 'ver-detalle.html',
})
export class VerDetallePage {
 

   // Compra  con su detalle
   compra: Compra;
   cuenta: any;
   detalle: any=[];
   valoresCompra:any;
   items: Array<any[]>;
 
  constructor(
   	 public navCtrl: NavController,
     public popoverCtrl: PopoverController,
     public navParams: NavParams,
     private anotacionesService: AnotacionesService,
     public alertCtrl: AlertController,
  	 ) 
	  {
     this.valoresCompra = (<any>Object).values(this.navParams.data);
     this.cuenta = this.valoresCompra['0'];
     this.compra = this.valoresCompra['1'];

     this.detalle = this.valoresCompra['1'].detalle; 
     this.items = Object.keys(this.detalle).map(i => this.detalle[i]);

	  }

  ionViewDidLoad() {
    
  }

  // Se anula la anotacion comppleta
  anular()
  {
       
     var key_cuenta = this.cuenta.cuenta.key;
     var key_compra = this.compra.key;
     var total_deuda = this.cuenta.cuenta.total_deuda;
     var total_deuda_nuevo = 0;
     var total_compra = this.compra.total_compra;
     var tipo_compra = this.compra.tipo;
     var estado = this.compra.estado;

   
          if(tipo_compra == "anota")
         {
           total_deuda_nuevo = total_deuda - total_compra; 
         }
         else if(tipo_compra == "entrega")
         {
           total_deuda_nuevo = total_deuda + total_compra; 
         }

         var estadoConexion = this.anotacionesService.estadoConex;
         if(estadoConexion)
         {
        
              this.anotacionesService.anularCompra(key_cuenta,key_compra).then(ref => {
                 
                 // Luego de anular la compra acutalizamos la cuenta 
                 this.anotacionesService.actualizarCuentaCompraAnulada(key_cuenta, total_deuda_nuevo);
                 this.anotacionesService.actualizarCuentaGeneralCompraAnulada(key_cuenta, total_deuda_nuevo);
            
                // aca iria una msj de compra anulada de forma exitosa
                 this.navCtrl.pop();
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
