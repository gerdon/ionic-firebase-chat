import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LazyloadPage } from './../lazyload/lazyload';
import { SignupPage } from './../signup/signup';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  onLazyload(): void {
    this.navCtrl.push(LazyloadPage);
  }

  onSignup(): void {
    this.navCtrl.push(SignupPage);
  }
}
