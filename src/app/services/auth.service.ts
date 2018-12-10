import { Observable,from } from 'rxjs';
//import { from } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth'
import * as firebase from 'firebase';

interface User{
  uid:string;
  email:string;
  photoURL?:string;
  displayName?:string; 
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:Observable<User>

  constructor(private afAuth:AngularFireAuth) { 
    this.user = afAuth.authState
  }

  googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }
  private oAuthLogin(provider){
    return this.afAuth.auth.signInWithPopup(provider)
    .then((credential)=>{this.updateUserData(credential.user)}).catch(error => {
      console.log(error)
    })
  }
  private updateUserData(user){
    console.log(user);
    
    //user = from(user)
  }

  logOut(){
    this.afAuth.auth.signOut();
  }

}
