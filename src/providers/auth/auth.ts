import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from './../../models/user.model';

import { BaseProvider } from '../base/base';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthProvider extends BaseProvider {

  constructor(
    public auth: AngularFireAuth,
    public http: HttpClient
  ) {
    super();
  }

  /**
   * Criar o usuário de autenticação do firebase com Email e Senha
   * @param user 
   */
  createAuthUser(user: {email: string, password: string}): Promise<firebase.User> {
    return this.auth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .catch(this.handlePromiseError);
  }

  signinWithEmail(user: {email: string, password: string}): Promise<boolean> {
    return this.auth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then((authState: firebase.User) => {
        return authState != null;
      }).catch(this.handlePromiseError);
  }

}
