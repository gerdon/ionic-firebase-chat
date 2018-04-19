import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({ name: 'page-lazyload' })
@Component({
  selector: 'page-lazyload',
  templateUrl: 'lazyload.html',
})
export class LazyloadPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LazyloadPage');
  }

}
