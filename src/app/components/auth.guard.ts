import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth:AngularFireAuth,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.auth.authState
    .pipe(
          map( user=>{
            let loggedIn=!!user;
            //loggedIn? return true: this.router.parseUrl('/login');
            if (loggedIn) return true;
            else return this.router.parseUrl('/login');
          }));
  }

}
