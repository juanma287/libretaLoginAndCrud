import { Component} from '@angular/core';
import { NavController, LoadingController, PopoverController, NavParams} from 'ionic-angular';;
import { Cuenta } from '../../../model/cuenta/cuenta.model';
import { Producto } from '../../../model/producto/producto.model';
//import { CuentaGeneral } from '../../../model/cuenta-general/cuenta-general.model';
import { ProductoService } from '../../../services/producto.service'
//import { ComercioService } from '../../../services/comercio.service';
import { HomeComercioPage } from "../../home-comercio/home-comercio";
import {ConfiguaracionesPage} from "../../configuaraciones/configuaraciones";
import { Observable } from 'rxjs/Observable';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'anotar',
  templateUrl: 'anotar.html',
})
export class Anotar {

   listaProductos$: Observable<Producto[]>
   cantidad: string 
   cuenta: Cuenta;
   valoresCuenta:any;

   fechaParaHTML = new Date().toISOString();
   pipe = new DatePipe('es'); 
   fecha_compra_number : any;
   fecha_compra:any;

  constructor(
   	 public navCtrl: NavController,
  	 private productoService: ProductoService,
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

 
	  }

  ionViewDidLoad() {
    // traemos los productos del comercio
       let loader = this.loading.create({  content: 'Pocesando…',  });
       loader.present().then(() => {

      this.listaProductos$ = this.productoService.getLista()
         .snapshotChanges().map(changes => {
           return changes.map (c => ({
           key: c.payload.key, ...c.payload.val()
        }));
      });    
       // finalizo loader
       loader.dismiss()                     
       });
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
