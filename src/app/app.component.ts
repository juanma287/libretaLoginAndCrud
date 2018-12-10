import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { LocalWeatherPage } from "../pages/local-weather/local-weather";
import { AuthService } from '../services/auth.service';


export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;
  appMenuItems: Array<MenuItem>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    private auth: AuthService,
  ) {
    this.initializeApp();

    this.appMenuItems = [
      {title: 'Home', component: HomePage, icon: 'home'},
      {title: 'Local Weather', component: LocalWeatherPage, icon: 'partly-sunny'}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      //*** Control Splash Screen
      // this.splashScreen.show();
      // this.splashScreen.hide();

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      //*** Control Keyboard
      this.keyboard.disableScroll(true);
    });

  

    this.auth.afAuth.authState
        .subscribe(
          user => {
            if (user)
             {
               // Traemos el usuario almacenado en al base de datos 
              this.auth.infoUsuarioBD()
              .subscribe(usuarioBD => 
                        {
                         console.log(usuarioBD)
                         console.log("juanma")
                        }
               );
             
              this.rootPage = HomePage;
             }
             else
             {
              this.rootPage = LoginPage;
             }
          },
          () =>
           {
            this.rootPage = LoginPage;
           }
        );


  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  logout() {
    this.auth.signOut();
    this.nav.setRoot(LoginPage);
  }

}
