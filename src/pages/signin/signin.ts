import { Component, ErrorHandler } from '@angular/core';
import { AlertController, IonicPage, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HomePage } from './../home/home';
import { SignupPage } from './../signup/signup';

import { AuthProvider } from './../../providers/auth/auth';
import { BaseProvider } from '../../providers/base/base';

import * as firebase from 'firebase/app';

@IonicPage({ name: 'page-signin' })
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage extends BaseProvider {

  signinForm: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    super();

    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signinForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  /**
   * Realiza login no firebase com Email e Senha
   */
  onSubmit(): void {

    let loading: Loading = this.showLoading('Por favor, aguarde...');
    let formUser = this.signinForm.value;

    this.authProvider.signinWithEmail(formUser)
      .then((isLogged: boolean) => {
        
        //Verifica se a promisse retorna True para login com sucesso
        if(isLogged) {
          this.navCtrl.setRoot(HomePage);
          loading.dismiss();
        }

      }).catch((error: any) => {
        console.log(error);
        loading.dismiss();
        this.showAlert(error);
      })
  }

  /**
   * Direcionar para a página Sign Up Page
   */
  onSignup(): void {
    // this.navCtrl.setPages(SignupPage);
    this.navCtrl.push(SignupPage);
  }

  /**
   * Exibe o load para informar o carregamento
   */
  private showLoading(message: string): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: message
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

  /**
   * Setar página Home como principal
   */
  onHomePage(): void {
    this.navCtrl.setRoot(HomePage)
      .then((hasAcess: boolean) => {
        console.log("Autorizado: ", hasAcess);
      }).catch(err => {
        console.log("Não autorizado: ", err);
      });
  }

  /**
   * Logout
   */
  onLogout(): void {
    this.authProvider.logout();
  }

}
