var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { LocalWeatherPage } from "../pages/local-weather/local-weather";
import { AuthService } from '../services/auth.service';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, keyboard, auth) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.keyboard = keyboard;
        this.auth = auth;
        this.rootPage = LoginPage;
        this.initializeApp();
        this.appMenuItems = [
            { title: 'Home', component: HomePage, icon: 'home' },
            { title: 'Local Weather', component: LocalWeatherPage, icon: 'partly-sunny' }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            //*** Control Splash Screen
            // this.splashScreen.show();
            // this.splashScreen.hide();
            //*** Control Status Bar
            _this.statusBar.styleDefault();
            _this.statusBar.overlaysWebView(false);
            //*** Control Keyboard
            _this.keyboard.disableScroll(true);
        });
        this.auth.afAuth.authState
            .subscribe(function (user) {
            if (user) {
                _this.rootPage = HomePage;
            }
            else {
                _this.rootPage = LoginPage;
            }
        }, function () {
            _this.rootPage = LoginPage;
        });
    };
    MyApp.prototype.openPage = function (page) {
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.logout = function () {
        this.auth.signOut();
        this.nav.setRoot(LoginPage);
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [Platform,
            StatusBar,
            SplashScreen,
            Keyboard,
            AuthService])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map