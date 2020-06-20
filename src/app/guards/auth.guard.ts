import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthState } from '../app.states';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  getState: Observable<any>;
  constructor(private store:Store<any>,private router:Router){
    this.getState = this.store.select(selectAuthState);
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let auth;
     this.getState.subscribe((state:any)=>{
     auth = state.isAuth
    });
    if(auth) return true;
    this.router.navigateByUrl('/login');
    return false;
  }
}
