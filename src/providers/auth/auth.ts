import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from './../../models/user.model';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthProvider {

  constructor(
    public auth: AngularFireAuth,
    public http: HttpClient
  ) {
    
  }

  createAuthUser(user: {email: string, password: string}): Promise<firebase.User> {
    return this.auth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

}
