import { Component} from '@angular/core';
import { NavController, LoadingController, PopoverController} from 'ionic-angular';;
import { Comercio } from '../../../model/comercio/comercio.model';
import { ComercioService } from '../../../services/comercio.service';
import { AgregarCuentaPage } from "../agregar-cuenta/agregar-cuenta";
import { EditarCuentaPage } from "../editar-cuenta/editar-cuenta";
import { Observable } from 'rxjs/Observable';
import { HomeComercioPage } from "../../home-comercio/home-comercio";
import {ConfiguaracionesPage} from "../../configuaraciones/configuaraciones";



@Component({
  selector: 'page-cuenta',
  templateUrl: 'cuenta.html',
})
export class CuentaPage {

  listaComercios$: Observable<Comercio[]>
  cantidad: string 

  constructor(
   	 public navCtrl: NavController,
  	 private comercioService: ComercioService,
  	 public loading: LoadingController,
     public popoverCtrl: PopoverController
  	 ) 
	  {
	  }

  ionViewDidLoad() {
   let loader = this.loading.create({  content: 'Pocesando…',  });
   loader.present().then(() => {

    this.listaComercios$ = this.comercioService.getListaComercios()
	     .snapshotChanges().map(changes => {
         return changes.map (c => ({
         key: c.payload.key, ...c.payload.val()
      }));
    });
	
    // calculamos la cantidad de cuentas
    this.listaComercios$.subscribe(result => {     
            this.cantidad = "Cantidad de cuentas registradas: "+ result.length +"";      
      });

	   // finalizo loader
    loader.dismiss()                     
    });
  }

  volverHome()
  {
     this.navCtrl.push(HomeComercioPage);
  }

  agregarComercio()
  {
  	 this.navCtrl.push(AgregarCuentaPage);
  }

   editarComercio(comercio: Comercio)
  {
  	 this.navCtrl.push(EditarCuentaPage, {comercio: comercio});
  }

   configuaraciones(myEvent) {
    let popover = this.popoverCtrl.create(ConfiguaracionesPage);
    popover.present({
      ev: myEvent
    });
  }

}
