import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from './../../models/user.model';

import { AuthProvider } from './../../providers/auth/auth';
import { UserProvider } from './../../providers/user/user';

import * as firebase from 'firebase/app';

@IonicPage({ name: 'page-signup'})
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup;

  constructor(
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userProvider: UserProvider
  ) {

    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

  }

  ionViewDidLoad() {
    
  }

  onSubmit(): void {

    let user: User = this.signupForm.value;

    this.authProvider.createAuthUser({
      email: user.email,
      password: user.password
    }).then((authUser: firebase.User) => {
      this.userProvider.createUser(user);
    })
  }

}
