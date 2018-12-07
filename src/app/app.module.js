var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from "@angular/core";
import { IonicApp, IonicModule } from "ionic-angular";
import { BrowserModule } from '@angular/platform-browser';
import { IonicStorageModule } from '@ionic/storage';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { ActivityService } from "../services/activity-service";
import { TripService } from "../services/trip-service";
import { WeatherProvider } from "../services/weather";
import { MyApp } from "./app.component";
import { SettingsPage } from "../pages/settings/settings";
import { CheckoutTripPage } from "../pages/checkout-trip/checkout-trip";
import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { ComercioPage } from "../pages/gestion-comercio/comercio/comercio";
import { AgregarComercioPage } from "../pages/gestion-comercio/agregar-comercio/agregar-comercio";
import { EditarComercioPage } from "../pages/gestion-comercio/editar-comercio/editar-comercio";
import { NotificationsPage } from "../pages/notifications/notifications";
import { RegisterPage } from "../pages/register/register";
import { SearchLocationPage } from "../pages/search-location/search-location";
import { TripDetailPage } from "../pages/trip-detail/trip-detail";
import { TripsPage } from "../pages/trips/trips";
import { LocalWeatherPage } from "../pages/local-weather/local-weather";
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthService } from '../services/auth.service';
import { ComercioService } from '../services/comercio.service';
export var firebaseConfig = {
    apiKey: "AIzaSyD8Wj--z7_Xt05oaqZ6PMF29Gh_m4z77Lk",
    authDomain: "libreta-electronica-4736d.firebaseapp.com",
    databaseURL: "https://libreta-electronica-4736d.firebaseio.com",
    projectId: "libreta-electronica-4736d",
    storageBucket: "libreta-electronica-4736d.appspot.com",
    messagingSenderId: "891119836846"
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                SettingsPage,
                CheckoutTripPage,
                HomePage,
                LoginPage,
                ComercioPage,
                AgregarComercioPage,
                EditarComercioPage,
                LocalWeatherPage,
                NotificationsPage,
                RegisterPage,
                SearchLocationPage,
                TripDetailPage,
                TripsPage
            ],
            imports: [
                BrowserModule,
                AngularFireModule.initializeApp(firebaseConfig, 'libreta-electronica'),
                AngularFireDatabaseModule,
                NgxErrorsModule,
                IonicModule.forRoot(MyApp, {
                    scrollPadding: false,
                    scrollAssist: true,
                    autoFocusAssist: false
                }),
                IonicStorageModule.forRoot({
                    name: '__ionic3_start_theme',
                    driverOrder: ['indexeddb', 'sqlite', 'websql']
                })
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                SettingsPage,
                CheckoutTripPage,
                HomePage,
                LoginPage,
                LocalWeatherPage,
                NotificationsPage,
                RegisterPage,
                SearchLocationPage,
                TripDetailPage,
                TripsPage,
                ComercioPage,
                AgregarComercioPage,
                EditarComercioPage
            ],
            providers: [
                StatusBar,
                SplashScreen,
                Keyboard,
                ActivityService,
                TripService,
                WeatherProvider,
                AngularFireAuth,
                AuthService,
                ComercioService
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map