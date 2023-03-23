import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import firebase from 'firebase/compat/app';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  user:string="Accedi";
  constructor(public dialog:MatDialog,public auth: AngularFireAuth){}
  ngOnInit(): void {
    this.verifyUser();
    console.log("user loggato:",this.user);




  }
  openLoginDialog(enterAnimationDuration: string, exitAnimationDuration: string):void
  {
    this.dialog.open(LoginDialogComponent,{
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration
    }).afterClosed().subscribe(()=>{console.log("after dialog closed");//dopo che il dialog si chiude
       this.verifyUser()});
}
openRegisterDialog(enterAnimationDuration: string, exitAnimationDuration: string):void
  {
    this.dialog.open(RegisterDialogComponent,{
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration
    }).afterClosed().subscribe(()=>{console.log("after dialog closed");//dopo che il dialog si chiude
       this.verifyUser()});
}
  verifyUser(){
    let curUser=localStorage.getItem('username') as string;


    if(curUser==null) this.user='Accedi';
    else this.user=curUser;
    console.log("user:",this.user);
  }

}

