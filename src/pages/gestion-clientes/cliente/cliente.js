var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
;
import { ComercioService } from '../../../services/comercio.service';
import { AgregarClientePage } from "../agregar-cliente/agregar-cliente";
import { EditarClientePage } from "../editar-cliente/editar-cliente";
var ClientePage = /** @class */ (function () {
    function ClientePage(navCtrl, comercioService, loading) {
        this.navCtrl = navCtrl;
        this.comercioService = comercioService;
        this.loading = loading;
    }
    ClientePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var loader = this.loading.create({ content: 'Pocesando…', });
        loader.present().then(function () {
            _this.listaComercios$ = _this.comercioService.getListaComercios()
                .snapshotChanges().map(function (changes) {
                return changes.map(function (c) { return (__assign({ key: c.payload.key }, c.payload.val())); });
            });
            // finalizo loader
            loader.dismiss();
        });
    };
    ClientePage.prototype.agregarComercio = function () {
        this.navCtrl.push(AgregarClientePage);
    };
    ClientePage.prototype.editarComercio = function (comercio) {
        this.navCtrl.push(EditarClientePage, { comercio: comercio });
    };
    ClientePage = __decorate([
        Component({
            selector: 'page-cliente',
            templateUrl: 'cliente.html',
        }),
        __metadata("design:paramtypes", [NavController,
            ComercioService,
            LoadingController])
    ], ClientePage);
    return ClientePage;
}());
export { ClientePage };
//# sourceMappingURL=cliente.js.map