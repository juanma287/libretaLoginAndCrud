var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { NavController, PopoverController } from "ionic-angular";
import { Storage } from '@ionic/storage';
import { NotificationsPage } from "../notifications/notifications";
import { SettingsPage } from "../settings/settings";
import { TripsPage } from "../trips/trips";
import { SearchLocationPage } from "../search-location/search-location";
var HomePage = /** @class */ (function () {
    function HomePage(storage, nav, popoverCtrl) {
        this.storage = storage;
        this.nav = nav;
        this.popoverCtrl = popoverCtrl;
        // search condition
        this.search = {
            name: "Rio de Janeiro, Brazil",
            date: new Date().toISOString()
        };
    }
    // Se ejecuta cuando entras en una página, antes de cargarla. Utilízalo para tareas que se deben realizar siempre que entras
    HomePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        // this.search.pickup = "Rio de Janeiro, Brazil";
        // this.search.dropOff = "Same as pickup";
        this.storage.get('pickup').then(function (val) {
            if (val === null) {
                _this.search.name = "Rio de Janeiro, Brazil";
            }
            else {
                _this.search.name = val;
            }
        }).catch(function (err) {
            console.log(err);
        });
    };
    // go to result page
    HomePage.prototype.doSearch = function () {
        this.nav.push(TripsPage);
    };
    // choose place
    HomePage.prototype.choosePlace = function (from) {
        this.nav.push(SearchLocationPage, from);
    };
    // to go account page
    HomePage.prototype.goToAccount = function () {
        this.nav.push(SettingsPage);
    };
    HomePage.prototype.presentNotifications = function (myEvent) {
        console.log(myEvent);
        var popover = this.popoverCtrl.create(NotificationsPage);
        popover.present({
            ev: myEvent
        });
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [Storage, NavController, PopoverController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//
//# sourceMappingURL=home.js.map