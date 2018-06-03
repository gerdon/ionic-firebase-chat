import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from '@firebase/util';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { User } from '../../models/user.model';

@Injectable()
export class UserProvider {

  userList: AngularFireList<User[]>;

  constructor(
    public db: AngularFireDatabase,
    public http: HttpClient
  ) 
  {
    this.userList = this.db.list('/users');
  }

  /**
   * Cria o usuário com o uid do usuário de autenticação
   * @param user 
   */
  createUser(user: User): Promise<void> {
    return this.db.object(`/users/${user.uid}`)
      .set(user)
      .catch();
  }
}
