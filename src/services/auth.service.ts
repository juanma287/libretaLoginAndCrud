import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {Storage} from '@ionic/storage';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;


@Injectable()
export class AuthService {
	private user: firebase.User;


	constructor(public afAuth: AngularFireAuth, private storage: Storage) {
		afAuth.authState.subscribe(user => {
			this.user = user;
		});

	}

    // autenticamos al usuario con e-mail y pass
	signInWithEmail(credentials) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
	}


    // crear un nuevo usuaruio con e-mail y pass
	signUp(credentials) {
		return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email,credentials.password);
	}

	get authenticated(): boolean {
		return this.user !== null;
	}

	getEmail() {
		return this.user && this.user.email;
	}

   
	signOut(): Promise<void> {
		return this.afAuth.auth.signOut();
	}

     // Ingresar con Google
	signInWithGoogle(): Promise<any> {
		console.log('Sign in with google');
		return this.socialSignIn(new firebase.auth.GoogleAuthProvider());

	}

	// Ingresar con Facebook
	signInWithFacebook(): Promise<any> {
	console.log('Sign in with Facebook');
		return this.socialSignIn(new firebase.auth.FacebookAuthProvider());
	}
  
    // Resetear pass
    resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email)
      .then(() => this.storage.set('emailEnviado', true))
      .catch((error) => this.storage.set('emailEnviado', false))
  }

    // Ver este modulo, COMENTE LO DEL TOKEN 
	private socialSignIn(provider: AuthProvider) {
		if (!(<any>window).cordova) {
			return this.afAuth.auth.signInWithPopup(provider);
		} else {
			return this.afAuth.auth.signInWithRedirect(provider)
			.then(() => {
				return this.afAuth.auth.getRedirectResult().then( result => {
				 
				}).catch(function(error) {
					// Handle Errors here.
					alert(error.message);
				});
			});
		}
	}

}