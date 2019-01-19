import { Component } from '@angular/core';
import { NavController, LoadingController} from 'ionic-angular';;
import { Comercio } from '../../../model/comercio/comercio.model';
import { ComercioService } from '../../../services/comercio.service';
import { AgregarCuentaPage } from "../agregar-cuenta/agregar-cuenta";
import { EditarCuentaPage } from "../editar-cuenta/editar-cuenta";
import { Observable } from 'rxjs/Observable';
import { HomeComercioPage } from "../../home-comercio/home-comercio";


@Component({
  selector: 'page-cuenta',
  templateUrl: 'cuenta.html',
})
export class CuentaPage {

  listaComercios$: Observable<Comercio[]>
  cantidadDeCuentas: string 

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
	
    // calculamos la cantidad de cuentas
    this.listaComercios$.subscribe(result => {
         switch(result.length) { 
         case 0: { 
            this.cantidadDeCuentas = "Aún no se registraron cuentas";
            break;     
         } 
         case 1: { 
            this.cantidadDeCuentas = "Se ha registrado 1 cuenta"; 
            break; 
         } 
          default: {
            this.cantidadDeCuentas = "Se encuentran registradas "+ result.length +" cuentas";
            break;    
         } 
        }  
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
}
