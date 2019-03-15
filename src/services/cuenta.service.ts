import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Cuenta } from '../model/cuenta/cuenta.model';
import { Storage } from '@ionic/storage';
import { Usuario } from '../model/usuario/usuario.model';
 
@Injectable()
export class CuentaService {
 
    public estadoConex: any;
    usuario: Usuario;
    public url: string;
    public listaCuentas: any;

    constructor(private db: AngularFireDatabase, private storage: Storage) 
     {
             // chequeamos el estado de la conexion 
             var connectedRef = this.db.object(".info/connected").valueChanges();
             connectedRef.subscribe(estadoConexion => 
                                    {
                                        this.estadoConex = estadoConexion;                    
                                    });

              // nos fijamos que usuario se encuentra conectado y obtenemos el ID de su comercio
              // luego traemos todas las cuentas que se encuentan creadas en el comercio donde trabaja el usuario
              this.storage.get('usuario').then((val) => {
                   this.usuario = val;
                   this.url ='lista-comercio/'+ this.usuario.id_comercio +'/cuentas';
                   this.listaCuentas = this.db.list<Cuenta>(this.url); 
                   });
    }
 
    getLista() {
        return this.listaCuentas;
    }
 
    agregar(cuenta: Cuenta) {   
            console.log(cuenta);
            return this.listaCuentas.push(cuenta);  
       
    }
 
    actualizar(cuenta: Cuenta) {
     
        return this.listaCuentas.update(cuenta.key, cuenta).then(error => console.log(error));
    }
 
    eliminar(cuenta: Cuenta) {
      
        return this.listaCuentas.remove(cuenta.key);
    }



}