import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {BrowserModule} from '@angular/platform-browser';
import {IonicStorageModule} from '@ionic/storage';
import { NgxErrorsModule } from '@ultimate/ngxerrors'

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from '@ionic-native/keyboard';



import {MyApp} from "./app.component";

import {SettingsPage} from "../pages/settings/settings";
import {LoginPage} from "../pages/login/login";

// gestion de comercios
import {ComercioPage} from "../pages/gestion-comercio/comercio/comercio";
import {AgregarComercioPage} from "../pages/gestion-comercio/agregar-comercio/agregar-comercio";
import {EditarComercioPage} from "../pages/gestion-comercio/editar-comercio/editar-comercio";

// gestion de productos
import {ProductoPage} from "../pages/gestion-productos/producto/producto";
import {AgregarProductoPage} from "../pages/gestion-productos/agregar-producto/agregar-producto";
import {EditarProductoPage} from "../pages/gestion-productos/editar-producto/editar-producto";


// gestion de cuentas
import {CuentaPage} from "../pages/gestion-cuentas/cuenta/cuenta";
import {AgregarCuentaPage} from "../pages/gestion-cuentas/agregar-cuenta/agregar-cuenta";
import {EditarCuentaPage} from "../pages/gestion-cuentas/editar-cuenta/editar-cuenta";

// gestion de clientes
import {ClientePage} from "../pages/gestion-clientes/cliente/cliente";
import {AgregarClientePage} from "../pages/gestion-clientes/agregar-cliente/agregar-cliente";
import {EditarClientePage} from "../pages/gestion-clientes/editar-cliente/editar-cliente";

import {HomeComercioPage} from "../pages/home-comercio/home-comercio";

// buscador de cuentas del ANOTADOR
import { BuscarCuentaPage } from "../pages/gestion-anotaciones/buscar-cuenta/buscar-cuenta";
import { Anotar } from "../pages/gestion-anotaciones/anotar/anotar";
import { VerAnotacionesPage } from "../pages/gestion-anotaciones/ver-anotaciones/ver-anotaciones";
import { VerAnotacionesCuentaPage } from "../pages/gestion-anotaciones/ver-anotaciones-cuenta/ver-anotaciones-cuenta";
import { VerDetallePage } from "../pages/gestion-anotaciones/ver-detalle/ver-detalle";


import {ConfiguaracionesPage} from "../pages/configuaraciones/configuaraciones";
import {RegisterPage} from "../pages/register/register";

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';


import { AuthService } from '../services/auth.service';
import { ComercioService } from '../services/comercio.service';
import { ProductoService } from '../services/producto.service';
import { CuentaService } from '../services/cuenta.service';
import { AnotacionesService } from '../services/anotaciones.service';


import { DatePipe } from '@angular/common';


export const firebaseConfig = {
    apiKey: "AIzaSyD8Wj--z7_Xt05oaqZ6PMF29Gh_m4z77Lk",
    authDomain: "libreta-electronica-4736d.firebaseapp.com",
    databaseURL: "https://libreta-electronica-4736d.firebaseio.com",
    projectId: "libreta-electronica-4736d",
    storageBucket: "libreta-electronica-4736d.appspot.com",
    messagingSenderId: "891119836846"
};

@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    HomeComercioPage,
    LoginPage,
    ComercioPage,
    AgregarComercioPage,
    EditarComercioPage,

    ProductoPage,
    AgregarProductoPage,
    EditarProductoPage,

    CuentaPage, 
    AgregarCuentaPage,
    EditarCuentaPage,

    ClientePage,
    AgregarClientePage,
    EditarClientePage,

    BuscarCuentaPage,
    Anotar,
    VerAnotacionesPage,
    VerAnotacionesCuentaPage,
    VerDetallePage,


    ConfiguaracionesPage,
    RegisterPage,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig,'libreta-electronica'),
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
    HomeComercioPage,
    LoginPage,
    ConfiguaracionesPage,
    RegisterPage,
    ComercioPage,
    AgregarComercioPage,
    EditarComercioPage,

    CuentaPage, 
    AgregarCuentaPage,
    EditarCuentaPage,

    ClientePage,
    AgregarClientePage,
    EditarClientePage,

    BuscarCuentaPage,
    Anotar,
    VerAnotacionesPage,
    VerAnotacionesCuentaPage,
    VerDetallePage,
    
    ProductoPage,
    AgregarProductoPage,
    EditarProductoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    AngularFireAuth,
    AuthService,
    ComercioService,
    ProductoService,
    CuentaService,
    AnotacionesService,
    DatePipe
  ]
})

export class AppModule {
}