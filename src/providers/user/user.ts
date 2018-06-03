import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from '@firebase/util';

import { User } from '../../models/user.model';

import { BaseProvider } from '../base/base';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

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
}
