import { Action } from "@ngrx/store";

export enum AuthActionsTypes {
  AUTH_LOGIN = '[Auth] Login',
  AUTH_LOGIN_SUCCESS = '[Auth] Login Success',
  AUTH_LOGIN_FAILED = '[Auth] Login Failed',
  AUTH_SIGNUP = '[Auth] Signup',
  AUTH_SIGNUP_SUCCESS = '[Auth] Signup Success',
  AUTH_SIGNUP_FAILED = '[Auth] Signup Failed',
  AUTH_LOGOUT = '[Auth] Logout'
}

export class Login implements Action {
  readonly type = AuthActionsTypes.AUTH_LOGIN;
  constructor(public payload:any) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionsTypes.AUTH_LOGIN_SUCCESS;
  constructor(public payload:any) {}
}

export class LoginFailed implements Action {
  readonly type = AuthActionsTypes.AUTH_LOGIN_FAILED;
  constructor(public payload:any) {}
}

export class Signup implements Action {
  readonly type = AuthActionsTypes.AUTH_SIGNUP;
  constructor(public payload:any) {}
}

export class SignupSuccess implements Action {
  readonly type = AuthActionsTypes.AUTH_SIGNUP_SUCCESS;
  constructor(public payload:any) {}
}

export class SignupFailed implements Action {
  readonly type = AuthActionsTypes.AUTH_SIGNUP_SUCCESS;
  constructor(public payload:any) {}
}

export class Logout implements Action {
  readonly type = AuthActionsTypes.AUTH_LOGOUT;
}

export type Actions = Login |
  LoginSuccess |
  LoginFailed  |
  Signup       |
  SignupFailed |
  SignupSuccess |
  Logout
