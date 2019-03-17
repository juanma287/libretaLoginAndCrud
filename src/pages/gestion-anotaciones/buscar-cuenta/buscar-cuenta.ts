import { Component} from '@angular/core';
import { NavController, LoadingController, PopoverController} from 'ionic-angular';;
import { Cuenta } from '../../../model/cuenta/cuenta.model';
import { CuentaService } from '../../../services/cuenta.service'
import { ComercioService } from '../../../services/comercio.service';
//import { AgregarCuentaPage } from "../agregar-cuenta/agregar-cuenta";
//import { EditarCuentaPage } from "../editar-cuenta/editar-cuenta";
import { Observable } from 'rxjs/Observable';
import { HomeComercioPage } from "../../home-comercio/home-comercio";
import {ConfiguaracionesPage} from "../../configuaraciones/configuaraciones";



@Component({
  selector: 'page-buscar-cuenta',
  templateUrl: 'buscar-cuenta.html',
})
export class BuscarCuentaPage {

  listaCuentas$: Observable<Cuenta[]>
  cantidad: string 

  constructor(
   	 public navCtrl: NavController,
  	 private cuentaService: CuentaService,
  	 public loading: LoadingController,
     public popoverCtrl: PopoverController
  	 ) 
	  {
	  }

  ionViewDidLoad() {
   let loader = this.loading.create({  content: 'Pocesando…',  });
   loader.present().then(() => {

    this.listaCuentas$ = this.cuentaService.getLista()
	     .snapshotChanges().map(changes => {
         return changes.map (c => ({
         key: c.payload.key, ...c.payload.val()
      }));
    });
	
    // calculamos la cantidad de cuentas
    this.listaCuentas$.subscribe(result => {     
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

  agregar()
  {
  //	 this.navCtrl.push(AgregarCuentaPage);
  }

   editar(cuenta: Cuenta)
  {
  //	 this.navCtrl.push(EditarCuentaPage, {cuenta: cuenta});
  }

   configuaraciones(myEvent) {
    let popover = this.popoverCtrl.create(ConfiguaracionesPage);
    popover.present({
      ev: myEvent
    });
  }

}
