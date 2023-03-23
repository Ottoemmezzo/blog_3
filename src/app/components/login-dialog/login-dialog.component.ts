import { Component, EventEmitter, Output } from '@angular/core';
import { signInWithEmailAndPassword } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
//import * as firebase from 'firebase/compat';
import firebase from 'firebase/compat/app';
import { LoginData } from 'src/app/model/loginData';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {
  @Output() loginEvent= new EventEmitter();
  loginData: LoginData={email:"",password:""};
  error="";
  email = new FormControl('', [Validators.required, Validators.email]);
  /*minimum 6 chars
  at least 1 number
  at least 1 Capital letter*/
  password= new FormControl('', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])\S{6,}')]);
  form:FormGroup;
  constructor(private router:Router,
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    public auth: AngularFireAuth,
    private authService:AuthService,
    private fb:FormBuilder)
    {
      this.form=fb.group({
        "email":this.email,
        "password":this.password

      });
    }
 /* login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

  }*/

  getErrorMessage() {
    let msg='';
    if (this.email.hasError('required')) {
      msg= 'You must enter a value';
    }
    if (this.password.hasError('required')) {
      msg= 'You must enter a value';
    }

    if (this.email.hasError('email'))  msg= 'email non valida';
    if (this.password.hasError('password')) msg= 'password non valida, deve avere almeno:1 maiuscola, 1 numero, 6 caratteri'
    return msg;
  }
  loginEmail(){//(loginData: LoginData){
    //this.auth.signInWithPopup(new firebase.auth.EmailAuthProvider());
    console.log("mail:",this.email.value);
    console.log("password",this.password.value);
      this.loginData.email=this.email.value as string;
      this.loginData.password=this.password.value as string;


      this.authService
        .login(this.loginData)
        .then(() =>{
          this.auth.user.subscribe(r=>{if(r?.email!=undefined) localStorage.setItem("username",<string>r?.email);
          console.log("store-user:",r?.email);});


          this.router.navigate(['/lista']);
          //this.loginEvent.emit();
        })
        .catch((e) =>{ console.log(e.message);
                       this.error=e.message;   });





  }
  loginGoogle(){
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.auth.user.subscribe(r=>{if(r?.displayName!=undefined)localStorage.setItem("username",<string>r?.displayName)});
    //this.loginEvent.emit();




  }
  /*logout() {
    this.auth.signOut();
  }*/
  logout() {
    /*this.authService
      .logout()
      .then(() =>{
        localStorage.removeItem("username");
        this.router.navigate([''])
    })
      .catch((e) => console.log(e.message));
    */
      this.auth.signOut();
      localStorage.removeItem("username");
      this.loginEvent.emit();
      this.router.navigate([''])
  }
  register(data: LoginData) {
    this.authService
      .register(data)
      .then(() => {
        this.loginEvent.emit();
        this.router.navigate([''])
      })
      .catch((e) => console.log(e.message));
  }


}
