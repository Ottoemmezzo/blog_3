import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserRoles } from '../model/roles';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$!: Observable<boolean>;
  pictureUrl$: Observable<string | null>;
  roles$:Observable<UserRoles>;
  constructor(
    private afAuth:AngularFireAuth,
    private router:Router)
    {
      this.isLoggedIn$=afAuth.authState.pipe(map(user=>!!user));
      this.isLoggedOut$=this.isLoggedOut$.pipe(map(loggedIn=>!loggedIn));
      this.pictureUrl$=afAuth.authState.pipe(map(user=>user? user.photoURL : null));
      this.roles$= this.afAuth.idTokenResult.pipe(map(token=> <any>token?.claims ?? {admin:false}));
  }
}
