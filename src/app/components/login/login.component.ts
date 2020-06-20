import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from 'src/app/app.states';
import { Login } from '../../actions/user.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  getState:Observable<any>;
  errorMsg: string | null;
  formLogin:FormGroup
  constructor(private fb:FormBuilder, public store:Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email:"",
      password:""
    });
    this.getState.subscribe((state:any)=> {
      this.errorMsg = state.errorMsg;
      if(this.errorMsg){
        setTimeout(()=>{
          this.errorMsg = null
        },5000)
      }
    });

  }

  close(){
    this.errorMsg = null;
  }

  auth(){
    let auth = {
      email: this.formLogin.get('email').value,
      password: this.formLogin.get('password').value
    }
    console.log(auth);
    this.store.dispatch(new Login(auth));
  }

  getCheckbox(event){
    console.log(event.target.checked);
  }
}
