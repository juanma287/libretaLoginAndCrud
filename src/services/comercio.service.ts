import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Comercio } from '../model/comercio/comercio.model';
 
@Injectable()
export class ComercioService {
 
    private listaComercios = this.db.list<Comercio>('comercio-list');
 
    constructor(private db: AngularFireDatabase) { }
 
    getListaComercios() {
        return this.listaComercios;
    }
 
    agregarComercio(comercio: Comercio) {
        return this.listaComercios.push(comercio);
    }
 
    actualizarComercio(comercio: Comercio) {
        return this.listaComercios.update(comercio.key, comercio);
    }
 
    eliminarComercio(comercio: Comercio) {
        return this.listaComercios.remove(comercio.key);
    }
}