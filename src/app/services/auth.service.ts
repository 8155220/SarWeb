import { Router } from '@angular/router';
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

  constructor(private afAuth:AngularFireAuth,private router:Router) { 
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
    this.router.navigate(["/dashboard/voluntarios/index"])
    
    //user = from(user)
  }

  logOut(){
    this.afAuth.auth.signOut().then(e => 
      this.router.navigate(["/welcome"])
    )
    
  }

}
