import { Component, OnDestroy, OnInit } from '@angular/core';
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
  ngOnInit() {

    const uiConfig={
      signInSuccessUrl:'/user',
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
  return true;

}
}
