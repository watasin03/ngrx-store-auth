import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState,selectAuthState } from 'src/app/app.states';
import { Signup } from 'src/app/actions/user.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  getState: Observable<any>;
  errorMsg: string | null;
  formSignup: FormGroup;
  sex:string;
  constructor(private fb:FormBuilder,public store:Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.formSignup = this.fb.group ({
      email: [""],
      password:[""],
      name:[""],
      age:[""],
      address:[""],
      phone:[""],
    });
    this.getState.subscribe((state:any)=>{
      this.errorMsg = state.errorMsg
      if(this.errorMsg){
        setTimeout(()=>{
          this.errorMsg = null
        },5000)
      }
    });
  }

  onSubmit(){
    const newSignup: User =  {
      email : this.formSignup.get('email').value,
      password:this.formSignup.get('password').value,
      name: this.formSignup.get('name').value,
      address: this.formSignup.get('address').value,
      age: this.formSignup.get('age').value,
      sex : this.sex
    }
    console.log(newSignup);
    this.store.dispatch(new Signup(newSignup));
  }

  getSexValue(sex?:string){
    this.sex = sex;
  }

}
