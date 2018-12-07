import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import {Storage} from '@ionic/storage';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;


@Injectable()
export class AuthService {

	private user: firebase.User;

	constructor(
		public afAuth: AngularFireAuth,
	    private storage: Storage,
	    private db: AngularFireDatabase
	    ) 
	    {
		 afAuth.authState.subscribe(user => {
			this.user = user;
		});

	}

    // retorna true si el usuario esta autenticado
	get authenticated(): boolean {
		return this.user !== null;
	}

	getEmail() {
		return this.user && this.user.email;
	}

	  // Retorna cuenta de usuario
	get currentUser(): any {
	    return this.authenticated ? this.user : null;
	  }

	  // Retorna user UID
    get currentUserId(): string {
	    return this.authenticated ? this.user.uid : '';
	  }


    // REDES SOCIALES

    // Ingresar con Google
	signInWithGoogle(): Promise<any> {
		return this.socialSignIn(new firebase.auth.GoogleAuthProvider())
		.then(() => this.updateUserData());
	}

	// Ingresar con Facebook
	signInWithFacebook(): Promise<any> {
		return this.socialSignIn(new firebase.auth.FacebookAuthProvider())
		.then(() => this.updateUserData());
      
	}

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


    // autenticamos al usuario con e-mail y pass
	signInWithEmail(credentials) {
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
	    .then(() => this.updateUserData());
      
	}

    // crear un nuevo usuaruio con e-mail y pass
	signUp(credentials) {
		return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email,credentials.password)
		.then(() => this.updateUserData());
	}

   
   // Actualizamos la info del usuario en la BD 
   public updateUserData(): void {
    
    console.log(this.afAuth.auth.currentUser.uid);
    let path = `usuarios/${this.afAuth.auth.currentUser.uid}`; 
    let data = {
                 email: this.afAuth.auth.currentUser.email
               }

    this.db.object(path).update(data)
    .catch(error => console.log(error));
   }


    // Resetear pass
    resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email)
      .then(() => this.storage.set('emailEnviado', true))
      .catch((error) => this.storage.set('emailEnviado', false))
    }


	  // Cerrar sesion 
	signOut(): Promise<void> {
		return this.afAuth.auth.signOut();
	}



}