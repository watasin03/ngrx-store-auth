import { User } from "../models/user";
import { Actions, AuthActionsTypes } from '../actions/user.actions';

export interface State {
  isAuth:boolean;
  user: User | null;
  errorMsg: string | null;
  token: string | null;
  exp:number | null;
  iat:number | null;
}

export const initialState: State = {
  isAuth:false,
  user:null,
  errorMsg:null,
  token:null,
  exp:null,
  iat:null
};

export function AuthReducer(state = initialState, action: Actions):State {
  switch (action.type) {
    case AuthActionsTypes.AUTH_LOGIN_SUCCESS : {
      let tokenConvert;
      let userDetail:User;
      tokenConvert = action.payload.token.split('.')[1];
      const payloadPar = tokenConvert.replace(/-/g, '+').replace(/_/g, '/');
      tokenConvert = decodeURIComponent(atob(payloadPar).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      userDetail = JSON.parse(tokenConvert)
      return {
        ...state,
        isAuth:true,
        user: userDetail,
        token: action.payload.token,
        errorMsg:null
      };
    }

    case AuthActionsTypes.AUTH_LOGIN_FAILED : {
      return {
        ...state,
        errorMsg: action.payload.error.message
      };
    }

    case AuthActionsTypes.AUTH_SIGNUP_SUCCESS : {
      let tokenConvert;
      let userDetail:User;
      tokenConvert = action.payload.token.split('.')[1];
      const payloadPar = tokenConvert.replace(/-/g, '+').replace(/_/g, '/');
      tokenConvert = decodeURIComponent(atob(payloadPar).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      userDetail = JSON.parse(tokenConvert)
      return {
        ...state,
        isAuth:true,
        user: userDetail,
        token: action.payload.token,
        errorMsg: null
      }
    }

    case AuthActionsTypes.AUTH_LOGIN_FAILED : {
      return {
        ...state,
        errorMsg:action.payload.error.message
      }
    }

    case AuthActionsTypes.AUTH_LOGOUT : {
      return initialState;
    }

    default: {
      return state;
    }
  }

}
