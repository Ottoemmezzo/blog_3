import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { map, Observable } from 'rxjs';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  user:string="Accedi";
  isLoggedin$!:Observable<Boolean>;
  isLoggedOut$!:Observable<Boolean>;
  constructor(public dialog:MatDialog,public auth: AngularFireAuth, private router:Router){}
  ngOnInit(): void {
    this.isLoggedin$= this.auth.authState.pipe(map(user=>!!user));
    this.isLoggedOut$=this.isLoggedin$.pipe(map(loggedIn=>!loggedIn));
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
logout(){
  this.auth.signOut();
  this.verifyUser();
  localStorage.removeItem("username");
  this.router.navigate([''])
}
  verifyUser(){
   this.auth.authState.subscribe(u=>{
      if(u!=undefined) this.user=u.displayName as string;
   });

  }

}

