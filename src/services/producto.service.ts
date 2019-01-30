import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Producto } from '../model/producto/producto.model';


 
@Injectable()
export class ProductoService {
 
    private listaPorductos = this.db.list<Producto>('lista-comercio/-LWZDXNJiBp4u6CqzgXo/productos');
    public estadoConex: any;

    constructor(private db: AngularFireDatabase) 
    {
         // chequeamos el estado de la conexion 
         var connectedRef = this.db.object(".info/connected").valueChanges();
         connectedRef.subscribe(estadoConexion => 
                                {
                                    this.estadoConex = estadoConexion;                    
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