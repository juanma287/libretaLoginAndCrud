import { Injectable } from '@angular/core';
import { AngularFireDatabase} from 'angularfire2/database';

import { Compra } from '../model/compra/compra.model';
import { Detalle } from '../model/detalle/detalle.model';

import { CuentaGeneral } from '../model/cuenta-general/cuenta-general.model';

import { Storage } from '@ionic/storage';
import { Usuario } from '../model/usuario/usuario.model';


@Injectable()
export class AnotacionesService {
 
    public estadoConex: any;
    usuario: Usuario;
    public key_comercio: any;
    public total_deuda:any;

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

    getCompras(key_cuenta)
    {
      let path =  'lista-compra/'+ this.key_comercio +'/'+ key_cuenta;
      let listaCompras = this.db.list<Compra>(path,
              ref => ref.orderByChild('fecha_compra_number')); 
      return listaCompras;
    }
 
    agregarCompra(key_cuenta, compra: Compra) {  

           let path =  'lista-compra/'+ this.key_comercio +'/'+ key_cuenta;
           let listaCuentasComercio = this.db.list<Compra>(path); 
           
           return listaCuentasComercio.push(compra);           
    }

    agregarDetalle(key_cuenta, key_compra, detalle: Detalle)
    {
       let path =  'lista-compra/'+ this.key_comercio +'/'+ key_cuenta +'/'+ key_compra + '/detalle';
       let listaCompra = this.db.list<Detalle>(path); 
           
       return listaCompra.push(detalle);  

    }

    // actualizamos el total de la deuda en la cuenta que tiene alamcenada el comercio
    actualizarCuentaComercio(key_cuenta, total_deuda_cuenta,  monto_compra) {   
      
      let path =  'lista-comercio/'+ this.key_comercio+'/cuentas/'+ key_cuenta;
      let data = {
                  total_deuda: total_deuda_cuenta + monto_compra
                 }
      return this.db.object(path).update(data); 
    } 

    // actualizamos el total de la deuda en la cuenta general
    actualizarCuentaGeneral(key_cuenta, total_deuda_cuenta, monto_compra) {   
                      
      let path =  'lista-cuenta/'+ this.key_comercio+'/'+ key_cuenta;
      let data = {
                  total_deuda: total_deuda_cuenta + monto_compra
                 }
      return this.db.object(path).update(data); 

    } 



    

}