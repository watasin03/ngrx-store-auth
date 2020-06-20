import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Logout } from 'src/app/actions/user.actions';
import { Observable } from 'rxjs';
import { selectAuthState } from 'src/app/app.states';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  getState:Observable<any>;
  user:User | null;
  constructor(public store: Store<any>,private router:Router) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.getState.subscribe((state:any)=>{
      console.log(state);
      if(state.user != null){
        this.user = {
          name: state.user.name,
          address: state.user.address,
          age: state.user.age,
          email:state.user.email,
          sex:state.user.sex,
          password:null
        }
      };

    });
  }

  logout(){
    this.store.dispatch(new Logout);
  }

}
