import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserProvider } from './../../providers/user/user';

@IonicPage({ name: 'page-signup'})
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup;

  constructor(
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
    // console.log(this.signupForm.value);
    this.userProvider.createUser(this.signupForm.value)
    // .then(() => {
    //   console.log("Usuário cadastrado");
    // });
  }

}
