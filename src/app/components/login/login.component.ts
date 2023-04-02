import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
//import * as firebase from 'firebase/compat';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy{
  ui!:firebaseui.auth.AuthUI;
  uid='';
  constructor(private afAuth:AngularFireAuth, private router:Router){
    this.afAuth.authState.subscribe(u=>this.uid=u?.uid as string);

  }
  ngOnInit() {

    const uiConfig={
      signInSuccessUrl:'',
      signInOptions:[
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks:{
          signInSuccessWithAuthResult:this
          .onLoginSuccess
          .bind(this)
        }
    };
    this.ui=new firebaseui.auth.AuthUI(firebase.auth());


    this.ui.start('#firebaseui-auth-container',uiConfig);


}
ngOnDestroy(): void {
  this.ui.delete();
}
onLoginSuccess(result:any){
  console.log("result:",result);
  this.afAuth.authState.subscribe(u=> this.router.navigate(['/user',u?.uid]));

  return false;

}

}
