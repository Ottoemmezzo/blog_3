import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginData } from 'src/app/model/loginData';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent {
  form!:FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  /*minimum 6 chars
  at least 1 number
  at least 1 Capital letter*/
  password= new FormControl('', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])\S{6,}')]);
  error="";
  loginData: LoginData={email:"",password:""};
  constructor(private fb:FormBuilder,private authsrv:AuthService){
    this.form=fb.group({
      "email":this.email,
      "password":this.password

    });
  }
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
  onSubmit(){
      this.loginData.email=this.email.value as string;
      this.loginData.password=this.password.value as string;
      console.log("data:",this.form.value);

      let logged=this.authsrv.register(this.loginData);
      this.error="Utente Registrato. Perfavore effettua il login."

  }
}
