var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase/app';
var AuthService = /** @class */ (function () {
    function AuthService(afAuth, storage, db) {
        var _this = this;
        this.afAuth = afAuth;
        this.storage = storage;
        this.db = db;
        afAuth.authState.subscribe(function (user) {
            _this.user = user;
        });
    }
    Object.defineProperty(AuthService.prototype, "authenticated", {
        // retorna true si el usuario esta autenticado
        get: function () {
            return this.user !== null;
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.getEmail = function () {
        return this.user && this.user.email;
    };
    Object.defineProperty(AuthService.prototype, "currentUser", {
        // Retorna cuenta de usuario
        get: function () {
            return this.authenticated ? this.user : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "currentUserId", {
        // Retorna user UID
        get: function () {
            return this.authenticated ? this.user.uid : '';
        },
        enumerable: true,
        configurable: true
    });
    // REDES SOCIALES
    // Ingresar con Google
    AuthService.prototype.signInWithGoogle = function () {
        var _this = this;
        return this.socialSignIn(new firebase.auth.GoogleAuthProvider())
            .then(function () { return _this.updateUserData(); })
            .catch(function (error) { return console.log(error); });
    };
    // Ingresar con Facebook
    AuthService.prototype.signInWithFacebook = function () {
        var _this = this;
        return this.socialSignIn(new firebase.auth.FacebookAuthProvider())
            .then(function () { return _this.updateUserData(); })
            .catch(function (error) { return console.log(error); });
    };
    AuthService.prototype.socialSignIn = function (provider) {
        var _this = this;
        if (!window.cordova) {
            return this.afAuth.auth.signInWithPopup(provider);
        }
        else {
            return this.afAuth.auth.signInWithRedirect(provider)
                .then(function () {
                return _this.afAuth.auth.getRedirectResult().then(function (result) {
                }).catch(function (error) {
                    // Handle Errors here.
                    alert(error.message);
                });
            });
        }
    };
    // autenticamos al usuario con e-mail y pass
    AuthService.prototype.signInWithEmail = function (credentials) {
        var _this = this;
        return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
            .then(function () { return _this.updateUserData(); })
            .catch(function (error) { return console.log(error); });
    };
    // crear un nuevo usuaruio con e-mail y pass
    AuthService.prototype.signUp = function (credentials) {
        var _this = this;
        return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
            .then(function () { return _this.updateUserData(); })
            .catch(function (error) { return console.log(error); });
    };
    // Actualizamos la info del usuario en la BD 
    AuthService.prototype.updateUserData = function () {
        console.log(this.user);
        var path = "usuarios/" + this.user.uid;
        var data = {
            email: "this.user.email"
        };
        this.db.object(path).update(data)
            .catch(function (error) { return console.log(error); });
    };
    // Resetear pass
    AuthService.prototype.resetPassword = function (email) {
        var _this = this;
        return this.afAuth.auth.sendPasswordResetEmail(email)
            .then(function () { return _this.storage.set('emailEnviado', true); })
            .catch(function (error) { return _this.storage.set('emailEnviado', false); });
    };
    // Cerrar sesion 
    AuthService.prototype.signOut = function () {
        return this.afAuth.auth.signOut();
    };
    AuthService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AngularFireAuth,
            Storage,
            AngularFireDatabase])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map