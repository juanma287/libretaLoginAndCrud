import { Component } from '@angular/core';
import { NavController, LoadingController} from 'ionic-angular';;
import { Comercio } from '../../../model/comercio/comercio.model';
import { ComercioService } from '../../../services/comercio.service';
import { AgregarProductoPage } from "../agregar-producto/agregar-producto";
import { EditarProductoPage } from "../editar-producto/editar-producto";
import {Observable } from 'rxjs/Observable';


@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {

  listaComercios$: Observable<Comercio[]>

  constructor(
   	 public navCtrl: NavController,
  	 private comercioService: ComercioService,
  	 public loading: LoadingController,
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
	
	   // finalizo loader
    loader.dismiss()                     
    });
  }

  agregarComercio()
  {
  	 this.navCtrl.push(AgregarProductoPage);
  }

   editarComercio(comercio: Comercio)
  {

  	 this.navCtrl.push(EditarProductoPage, {comercio: comercio});
  }
}
