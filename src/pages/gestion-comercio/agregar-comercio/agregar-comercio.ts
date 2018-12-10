import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Comercio } from '../../../model/comercio/comercio.model';
import { ComercioService } from '../../../services/comercio.service';
import {ComercioPage} from "../comercio/comercio";

@Component({
  selector: 'page-agregar-comercio',
  templateUrl: 'agregar-comercio.html',
})
export class AgregarComercioPage {

  comercio: Comercio = {
    nombre: '',
    ciudad: ''
   };


  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	private comercioService: ComercioService
  	) {
  }


  agregarComercio(comercio: Comercio) {
    this.comercioService.agregarComercio(comercio).then(ref => {
      this.navCtrl.setRoot(ComercioPage);
    })
  }



}
