import { Component, ErrorHandler } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, IonicPage, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';

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
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
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

    let loading = this.showLoading();
    let formUser = this.signupForm.value;

    this.authProvider.createAuthUser({
      email: formUser.email,
      password: formUser.password
    }).then((authUser: firebase.User) => {

      delete formUser.password;     //Deleta o password do formulário
      formUser.uid = authUser.uid;  //Cria o campo uid para usuário e atribui o uid do AuthUser

      this.userProvider.createUser(formUser)
        .then(() => {
          console.log('Usuário cadastrado!');
          loading.dismiss();
        }).catch((error: any) => {
          console.log(error);
          loading.dismiss();
          this.showAlert(error);
        });

    }).catch((error: any) => {
      console.log(error);
      loading.dismiss();
      this.showAlert(error);
    });
  }

  /**
   * Exibe o load para informar o carregamento
   */
  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Por favor, aguarde...'
    });

    loading.present();

    return loading;
  }

  /**
   * Exibe um alert com uma mensagem
   * @param message
   */
  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }

}
