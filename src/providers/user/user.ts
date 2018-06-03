import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { User } from '../../models/user.model';

import { BaseProvider } from '../base/base';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class UserProvider extends BaseProvider {

  userList: AngularFireList<User[]>;

  constructor(
    public db: AngularFireDatabase,
    public http: HttpClient
  ) 
  {
    super();
    this.userList = this.db.list('/users');
  }

  /**
   * Cria o usuário com o uid do usuário de autenticação
   * @param user 
   */
  createUser(user: User): Promise<void> {
    return this.db.object(`/users/${user.uid}`)
      .set(user)
      .catch(this.handlePromiseError);
  }

  userExists(username: string): Observable<boolean> {
    return this.db.list(`/users`,
      (ref: firebase.database.Reference) => ref.orderByChild('username').equalTo(username)
    )
    .valueChanges()
    .map((users: User[]) => {
      return users.length > 0;
    }).catch(this.handleObservableError);
  }

}
