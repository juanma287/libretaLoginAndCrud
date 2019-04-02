import { Component} from '@angular/core';
import { NavController, LoadingController, PopoverController, NavParams} from 'ionic-angular';;
import { Cuenta } from '../../../model/cuenta/cuenta.model';
import { Producto } from '../../../model/producto/producto.model';
//import { CuentaGeneral } from '../../../model/cuenta-general/cuenta-general.model';
import { ProductoService } from '../../../services/producto.service'
//import { ComercioService } from '../../../services/comercio.service';
import { BuscarCuentaPage } from "../../gestion-anotaciones/buscar-cuenta/buscar-cuenta";
import {ConfiguaracionesPage} from "../../configuaraciones/configuaraciones";
import { Observable } from 'rxjs/Observable';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'anotar',
  templateUrl: 'anotar.html',
})
export class Anotar {

   listaProductos$: Observable<Producto[]>
   productoDetalle$:Observable<Producto[]>
   cuenta: Cuenta;
   valoresCuenta:any;

   fechaParaHTML = new Date().toISOString();
   pipe = new DatePipe('es'); 
   fecha_compra_number : any;
   fecha_compra:any;
   monto_compra: number = 0;

   listaDetalle: Array<any> = [
   {
        id_producto:0,
        nombre_producto:'',
        cantidad:'',
        unidad:'',
        precio: 0,
        total_detalle:0
    }
  ];

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
     this.navCtrl.push(BuscarCuentaPage);
  }

  agregarDetalle()
  {
    let detalle = {
        id_producto:0,
        nombre_producto:'',
        cantidad:'',
        unidad:'',
        precio: 0,
        total_detalle:0
        }
  
    this.listaDetalle.push(detalle);    
  }

  // por defecto eleiminamos el ultimo item
  eliminarDetalle()
  {
    this.listaDetalle.pop();
    // this.listaDetalle(0, 1) de esta forma eliminamos el elemtno de la posicion 0
    this.calcularTotalCompra();
  }

 // se ejecuta cuando cargamos la cantidad de un producto
 onChangeCantidad(indice)
 {
  this.listaDetalle[indice].total_detalle = this.listaDetalle[indice].cantidad * this.listaDetalle[indice].precio;
  this.calcularTotalCompra();
 
 }

 calcularTotalCompra()
 {
    let length = this.listaDetalle.length;
    let aux = 0;
    for (var i = 0; i < length; ++i) 
    {
      aux= aux + this.listaDetalle[i].total_detalle;
    }
    this.monto_compra = aux;
 }
  // se ejecuta cuando elegimos el producto
 onChangeProducto(key,indice) 
  {
    this.productoDetalle$ = this.listaProductos$
    .map( productos =>
           productos.filter( prod => prod.key === key)
      );
     
    this.productoDetalle$.subscribe(val => 
      {
        this.listaDetalle[indice].nombre_producto = val[0].nombre;
        this.listaDetalle[indice].id_producto = val[0].key;
        this.listaDetalle[indice].unidad = val[0].unidad;
        this.listaDetalle[indice].precio = val[0].precio;
        console.log(this.listaDetalle)
      }
    );

  }


   configuaraciones(myEvent) {
    let popover = this.popoverCtrl.create(ConfiguaracionesPage);
    popover.present({
      ev: myEvent
    });
  }

}
