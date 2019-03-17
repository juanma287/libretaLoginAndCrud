
import {Component} from "@angular/core";
import {NavController, PopoverController} from "ionic-angular";
import {Storage} from '@ionic/storage';

import {ConfiguaracionesPage} from "../configuaraciones/configuaraciones";
import {SettingsPage} from "../settings/settings";
import {TripsPage} from "../trips/trips";
import {SearchLocationPage} from "../search-location/search-location";

import {CuentaPage} from "../gestion-cuentas/cuenta/cuenta";
import {ClientePage} from "../gestion-clientes/cliente/cliente";
import {ProductoPage} from "../gestion-productos/producto/producto";
import {BuscarCuentaPage} from "../gestion-anotaciones/buscar-cuenta/buscar-cuenta";

import { Usuario } from '../../model/usuario/usuario.model';


@Component({
  selector: 'page-home-comercio',
  templateUrl: 'home-comercio.html',
})

export class HomeComercioPage {
  
  usuario: Usuario;

  constructor(private storage: Storage, public nav: NavController, public popoverCtrl: PopoverController) {
     this.storage.get('usuario').then((val) => {
        this.usuario = val;
     });
  }

  // Se ejecuta cuando entras en una página, antes de cargarla. Utilízalo para tareas que se deben realizar siempre que entras
  ionViewWillEnter() {

  }

  gestionMenuComercio(home)
  {
      switch(home) { 
       case 'anotar': { 
          // mostramos el home de cuenta
          this.nav.push(BuscarCuentaPage); 
          break; 
          
       } 
      case 'cuenta': { 
          // mostramos el home de clientes
          this.nav.push(CuentaPage); 
          break; 
       } 
       case 'cliente': { 
          // mostramos el home de clientes
          this.nav.push(ClientePage); 
          break; 
       } 
       case 'producto': {
          // mostramos el home de productos
          this.nav.push(ProductoPage);
          break;    
       } 
      }
  }

  configuaraciones(myEvent) {
    let popover = this.popoverCtrl.create(ConfiguaracionesPage);
    popover.present({
      ev: myEvent
    });
  }




}

//

