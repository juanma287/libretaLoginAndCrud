
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

@Component({
  selector: 'page-home-comercio',
  templateUrl: 'home-comercio.html',
})

export class HomeComercioPage {
  // search condition
  public search = {
    name: "Rio de Janeiro, Brazil",
    date: new Date().toISOString()
  }

  constructor(private storage: Storage, public nav: NavController, public popoverCtrl: PopoverController) {
  }

  // Se ejecuta cuando entras en una página, antes de cargarla. Utilízalo para tareas que se deben realizar siempre que entras
  ionViewWillEnter() {
    // this.search.pickup = "Rio de Janeiro, Brazil";
    // this.search.dropOff = "Same as pickup";
    this.storage.get('pickup').then((val) => {
      if (val === null) {
        this.search.name = "Rio de Janeiro, Brazil"
      } else {
        this.search.name = val;
      }
    });
  }

  gestionMenuComercio(home)
  {
      switch(home) { 
       case 'cuenta': { 
          // mostramos el home de cuenta
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

  
  // go to result page
  doSearch() {
    this.nav.push(TripsPage);
  }

  // choose place
  choosePlace(from) {
    this.nav.push(SearchLocationPage, from);
  }

  // to go account page
  goToAccount() {
    this.nav.push(SettingsPage);
  }

  configuaraciones(myEvent) {
    let popover = this.popoverCtrl.create(ConfiguaracionesPage);
    popover.present({
      ev: myEvent
    });
  }

}

//

