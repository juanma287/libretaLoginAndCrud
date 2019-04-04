import { Injectable } from '@angular/core';
import { AngularFireDatabase} from 'angularfire2/database';

import { Compra } from '../model/compra/compra.model';

import { Cuenta } from '../model/cuenta/cuenta.model';
import { CuentaGeneral } from '../model/cuenta-general/cuenta-general.model';

import { Storage } from '@ionic/storage';
import { Usuario } from '../model/usuario/usuario.model';


@Injectable()
export class AnotacionesService {
 
    public estadoConex: any;
    usuario: Usuario;
    public key_comercio: any;

    /*
    INFO:
    1 - cuando un negocio actualice o elimine una compra, la misma NO será eliminada, solo se 
    modifica el estado
    */

    constructor(private db: AngularFireDatabase, private storage: Storage) 
     {

             // chequeamos el estado de la conexion 
             var connectedRef = this.db.object(".info/connected").valueChanges();
             connectedRef.subscribe(estadoConexion => 
                                    {
                                        this.estadoConex = estadoConexion;                    
                                    });
              // nos fijamos que usuario se encuentra conectado y obtenemos el ID de su comercio
              this.storage.get('usuario').then((val) => {
                   this.usuario = val;
                   this.key_comercio = this.usuario.id_comercio;            
                
                   });
    }
 
    // MÉTODOS PARA LAS CUENTAS QUE TIENE ALMACENADA EL COMERCIO
    getLista() {
        //return this.listaCuentasComercio;
    }

 
    agregar(key_cuenta, compra: Compra) {  

           let path =  'lista-compra/'+ this.key_comercio +'/'+ key_cuenta;
           let listaCuentasComercio = this.db.list<Compra>(path); 
           
           return listaCuentasComercio.push(compra);           
    }


 
    actualizar(cuenta: Cuenta) {

        //return this.listaCuentasComercio.update(cuenta.key, cuenta).then(error => console.log(error));
    }

    eliminar(cuenta: Cuenta) {
      
     //   return this.listaCuentasComercio.remove(cuenta.key);
    }


    

}