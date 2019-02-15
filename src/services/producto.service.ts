import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Producto } from '../model/producto/producto.model';
import { Storage } from '@ionic/storage';
import { Usuario } from '../model/usuario/usuario.model';
 
@Injectable()
export class ProductoService {
 
    public estadoConex: any;
    usuario: Usuario = {
        id_comercio: '',
        email: '',
        cuentas: '',
    };
    public url: string;
    public listaPorductos: any;

    constructor(
        private db: AngularFireDatabase,  
        private storage: Storage
        ) 
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
               this.url ='lista-comercio/'+ this.usuario.id_comercio +'/productos';
               this.listaPorductos = this.db.list<Producto>(this.url); 
               });
    }
 
    getLista() {
        return this.listaPorductos;
    }
 
    agregar(producto: Producto) {   

            return this.listaPorductos.push(producto);     
    }
 
    actualizar(producto: Producto) {
     
        return this.listaPorductos.update(producto.key, producto).then(error => console.log(error));
    }
 
    eliminar(producto: Producto) {
      
        return this.listaPorductos.remove(producto.key);
    }



}