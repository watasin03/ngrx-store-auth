import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import * as AuthAction from '../actions/user.actions';
import { tap, mergeMap,catchError, map} from 'rxjs/operators';

@Injectable()
export class AuthEffects {
  constructor(private actions:Actions,private authService:AuthService,private router:Router){}

  @Effect()
  Login: Observable<any> = this.actions.pipe(
    ofType<AuthAction.Login>(
      AuthAction.AuthActionsTypes.AUTH_LOGIN
    ),
    mergeMap((action:AuthAction.Login)=>
      this.authService.login(action.payload).pipe(
        map((data:any)=>{
         return new AuthAction.LoginSuccess(data);
        }),
        catchError((err:any)=>{
          console.log(err);
         return of(new AuthAction.LoginFailed(err))
        })
      )
    )
  );

  @Effect({dispatch: false})
  LoginSuccess:Observable<any> = this.actions.pipe(
    ofType<AuthAction.LoginSuccess>(
      AuthAction.AuthActionsTypes.AUTH_LOGIN_SUCCESS
    ),
    tap((user:any)=>{
      localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('/');
    })
  );

  @Effect({dispatch:false})
  LoginFailed:Observable<any> = this.actions.pipe(
    ofType<AuthAction.LoginFailed>(AuthAction.AuthActionsTypes.AUTH_LOGIN_FAILED)
  );

  @Effect()
  Signup: Observable<any> = this.actions.pipe(
    ofType<AuthAction.Signup>(
      AuthAction.AuthActionsTypes.AUTH_SIGNUP
    ),
    mergeMap((action:AuthAction.Signup)=>
      this.authService.signup(action.payload).pipe(
        map((data:any)=>{
          console.log(data);
         return new AuthAction.SignupSuccess(data);
        }),
        catchError((err:any)=>{
          console.log(err);
         return of(new AuthAction.SignupFailed(err))
        })
      )
    )
  );

  @Effect({dispatch: false})
  SignupSuccess: Observable<any> = this.actions.pipe(
    ofType<AuthAction.SignupSuccess>(
      AuthAction.AuthActionsTypes.AUTH_SIGNUP_SUCCESS
    ),
    tap((user:any)=>{
      localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('/');
    })
  );

  @Effect({dispatch:false})
  SignupFailed:Observable<any> = this.actions.pipe(
    ofType<AuthAction.SignupFailed>(AuthAction.AuthActionsTypes.AUTH_SIGNUP_FAILED)
  );

  @Effect({dispatch:false})
  Logout:Observable<any> = this.actions.pipe(
    ofType<AuthAction.Logout>(
      AuthAction.AuthActionsTypes.AUTH_LOGOUT
    ),
    tap((user:any)=>{
      localStorage.removeItem('token');
      this.router.navigateByUrl('/login');
    })
  );
}
