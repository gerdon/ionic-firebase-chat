import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LazyloadPage } from './../pages/lazyload/lazyload';
import { SignupPage } from './../pages/signup/signup';

import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyDmOLRxyXGKFhmnRT9efZTaeIDHluK_IXg",
  authDomain: "ionic-firebase-chat-c7a04.firebaseapp.com",
  databaseURL: "https://ionic-firebase-chat-c7a04.firebaseio.com",
  projectId: "ionic-firebase-chat-c7a04",
  storageBucket: "ionic-firebase-chat-c7a04.appspot.com",
  messagingSenderId: "257766260625"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LazyloadPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LazyloadPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
