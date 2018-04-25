import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { LazyloadPage } from './../lazyload/lazyload';
import { SignupPage } from './../signup/signup';

import { UserProvider } from './../../providers/user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // userList: AngularFireList<User[]>;
  // userList: any;
  userList: Observable<any[]>;


  constructor(
    public navCtrl: NavController,
    public userProvider: UserProvider) {
  }

  ionViewDidLoad(){
    this.userList = this.userProvider.userList.valueChanges();
  }

  onLazyload(): void {
    this.navCtrl.push(LazyloadPage);
  }

  onSignup(): void {
    this.navCtrl.push(SignupPage);
  }

  onChatCreate(user): void {

  }
}
