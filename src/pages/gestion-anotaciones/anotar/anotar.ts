import { Component} from '@angular/core';
import { NavController, AlertController, LoadingController, PopoverController, NavParams} from 'ionic-angular';;
import { Cuenta } from '../../../model/cuenta/cuenta.model';
import { Compra } from '../../../model/compra/compra.model';
import { Producto } from '../../../model/producto/producto.model';
//import { CuentaGeneral } from '../../../model/cuenta-general/cuenta-general.model';
import { ProductoService } from '../../../services/producto.service'
import { AnotacionesService } from '../../../services/anotaciones.service'
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
 
   public compra: Compra = {
      total_compra: 0,
      fecha_compra:'',
      fecha_compra_number: 0,
      estado: 'intacta',
      lista_detalle: '',
    };

   // lista de productos que tiene el comercio y el producto elegido en un detalle
   listaProductos$: Observable<Producto[]>
   productoDetalle$:Observable<Producto[]>

   // cuenta en la que anotaremos 
   cuenta: Cuenta;
   valoresCuenta:any;
   key_cuenta:any;
    
   // fecha y monto de la compra 
   fechaParaHTML = new Date().toISOString();
   pipe = new DatePipe('es'); 
   fecha_compra_number : any;
   fecha_compra:any;
   monto_compra: number = 0;

   // Lista de detalles que forman parte de la compra 
   listaDetalle: Array<any> = [
   {
        id_producto:0,
        nombre_producto:'',
        cantidad:'',
        unidad:'',
        precio: 0,
        total_detalle:0
    }];

  constructor(
   	 public navCtrl: NavController,
     private anotacionesService: AnotacionesService,
  	 private productoService: ProductoService,
  	 public loading: LoadingController,
     public alertCtrl: AlertController,
     public popoverCtrl: PopoverController,
     public navParams: NavParams
  	 ) 
	  {
     // leemos el parametro y cargamos los valores en la variable valoresCuenta
     this.cuenta = this.navParams.data;
     this.valoresCuenta = (<any>Object).values(this.cuenta);
     this.valoresCuenta = this.valoresCuenta['0'];
     this.key_cuenta = this.valoresCuenta.key

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

  anotar()
  {
     // completamos los datos de la cuenta
     this.compra.total_compra = this.monto_compra;
     this.compra.fecha_compra = this.fecha_compra;
     // se pone negativa para poder ordenar desendente con firebase
     this.compra.fecha_compra_number = this.fecha_compra_number * -1;

     var estadoConexion = this.anotacionesService.estadoConex;
     if(estadoConexion)
     {
          this.anotacionesService.agregar(this.key_cuenta,this.compra).then(ref => { 
                 this.navCtrl.setRoot(BuscarCuentaPage);
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

  cambiarFecha()  {
    this.fecha_compra = this.pipe.transform(this.fechaParaHTML ,'dd/MM/yyyy');
    this.fecha_compra_number = new Date(this.fechaParaHTML).getTime();
  }

  agregarDetalle() {
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
  eliminarDetalle() {
    this.listaDetalle.pop();
    // this.listaDetalle(0, 1) de esta forma eliminamos el elemtno de la posicion 0
    this.calcularTotalCompra();
  }

 // se ejecuta cuando cargamos la cantidad de un producto
 onChangeCantidad(indice){
  this.listaDetalle[indice].total_detalle = this.listaDetalle[indice].cantidad * this.listaDetalle[indice].precio;
  this.listaDetalle[indice].total_detalle = this.truncateDecimals(this.listaDetalle[indice].total_detalle,2);

  this.calcularTotalCompra();
 
 }

  // se ejecuta cuando elegimos el producto
 onChangeProducto(key,indice) {
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
      }
    );

  }

 calcularTotalCompra(){
    let length = this.listaDetalle.length;
    let aux = 0;
    for (var i = 0; i < length; ++i) 
    {
      aux= aux + this.listaDetalle[i].total_detalle;
    }
    this.monto_compra = this.truncateDecimals(aux, 2);
 }
  
  truncateDecimals (number, digits) {
    var multiplier = Math.pow(10, digits),
        adjustedNum = number * multiplier,
        truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

    return truncatedNum / multiplier;
  };



  volverHome() {
     this.navCtrl.push(BuscarCuentaPage);
  }

   configuaraciones(myEvent) {
    let popover = this.popoverCtrl.create(ConfiguaracionesPage);
    popover.present({
      ev: myEvent
    });
  }

}
