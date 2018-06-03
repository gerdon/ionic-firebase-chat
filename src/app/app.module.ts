import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { LazyloadPage } from './../pages/lazyload/lazyload';
import { SignupPage } from './../pages/signup/signup';

import { AuthProvider } from '../providers/auth/auth';
import { BaseProvider } from '../providers/base/base';
import { UserProvider } from '../providers/user/user';

import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

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
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseAppConfig),
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LazyloadPage,
    SignupPage
  ],
  providers: [
    AuthProvider,
    AngularFireAuth,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider
  ]
})
export class AppModule {}
