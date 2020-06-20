import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectAuthState } from 'src/app/app.states';
import { Logout } from 'src/app/actions/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  getState:Observable<any>;
  name:string | null;
  subScribption:Subscription;
  constructor(public store: Store<any>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(){
    this.getState.subscribe((state:any)=>{
      console.log(state);
      if(state.user) this.name = state.user.name;
    });
  }

  logout(){
    this.store.dispatch(new Logout);
    this.name = null;
  }

}
